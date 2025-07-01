
-- Add package_type column to investment_packages table
ALTER TABLE public.investment_packages 
ADD COLUMN package_type text NOT NULL DEFAULT 'stable' CHECK (package_type IN ('daily', 'stable'));

-- Add daily_income column to track calculated daily income for daily packages
ALTER TABLE public.investment_packages 
ADD COLUMN daily_income numeric(15,2) GENERATED ALWAYS AS (
  CASE 
    WHEN package_type = 'daily' THEN (return_amount - amount) / duration_days
    ELSE 0
  END
) STORED;

-- Add last_payout_date to user_investments to track daily payouts
ALTER TABLE public.user_investments 
ADD COLUMN last_payout_date timestamp with time zone DEFAULT now();

-- Add total_paid_out to track how much has been paid out so far
ALTER TABLE public.user_investments 
ADD COLUMN total_paid_out numeric(15,2) DEFAULT 0.00;

-- Add is_completed to mark when investment is fully paid out
ALTER TABLE public.user_investments 
ADD COLUMN is_completed boolean DEFAULT false;

-- Create daily_payouts table to track individual payout records
CREATE TABLE public.daily_payouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  investment_id uuid REFERENCES public.user_investments(id) ON DELETE CASCADE NOT NULL,
  amount numeric(15,2) NOT NULL,
  payout_date timestamp with time zone DEFAULT now() NOT NULL,
  payout_type text NOT NULL CHECK (payout_type IN ('daily_income', 'capital_return', 'final_payout')),
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS on daily_payouts
ALTER TABLE public.daily_payouts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for daily_payouts
CREATE POLICY "Users can view own payouts" ON public.daily_payouts
  FOR SELECT USING (
    investment_id IN (
      SELECT id FROM public.user_investments WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admin can manage all payouts" ON public.daily_payouts
  FOR ALL USING (public.is_current_user_admin());

-- Create function to process daily payouts
CREATE OR REPLACE FUNCTION public.process_daily_payouts()
RETURNS void AS $$
DECLARE
  investment_record RECORD;
  daily_amount numeric(15,2);
  days_since_last_payout integer;
  total_days_passed integer;
  should_return_capital boolean;
BEGIN
  -- Process daily income for active daily investments
  FOR investment_record IN 
    SELECT ui.*, ip.package_type, ip.daily_income, ip.duration_days
    FROM public.user_investments ui
    JOIN public.investment_packages ip ON ui.package_id = ip.id
    WHERE ui.status = 'active' 
    AND ip.package_type = 'daily'
    AND ui.is_completed = false
    AND ui.maturity_date > now()
  LOOP
    -- Calculate days since last payout
    days_since_last_payout := EXTRACT(days FROM (now() - investment_record.last_payout_date));
    
    -- Only process if it's been at least 24 hours
    IF days_since_last_payout >= 1 THEN
      daily_amount := investment_record.daily_income;
      
      -- Add daily income to user's wallet
      UPDATE public.profiles 
      SET wallet_balance = wallet_balance + daily_amount
      WHERE id = investment_record.user_id;
      
      -- Record the payout
      INSERT INTO public.daily_payouts (investment_id, amount, payout_type)
      VALUES (investment_record.id, daily_amount, 'daily_income');
      
      -- Update investment record
      UPDATE public.user_investments
      SET 
        last_payout_date = now(),
        total_paid_out = total_paid_out + daily_amount
      WHERE id = investment_record.id;
    END IF;
  END LOOP;
  
  -- Process capital return for completed daily investments
  FOR investment_record IN 
    SELECT ui.*, ip.package_type
    FROM public.user_investments ui
    JOIN public.investment_packages ip ON ui.package_id = ip.id
    WHERE ui.status = 'active' 
    AND ip.package_type = 'daily'
    AND ui.is_completed = false
    AND ui.maturity_date <= now()
  LOOP
    -- Return original capital
    UPDATE public.profiles 
    SET wallet_balance = wallet_balance + investment_record.amount
    WHERE id = investment_record.user_id;
    
    -- Record capital return
    INSERT INTO public.daily_payouts (investment_id, amount, payout_type)
    VALUES (investment_record.id, investment_record.amount, 'capital_return');
    
    -- Mark investment as completed
    UPDATE public.user_investments
    SET 
      is_completed = true,
      status = 'completed'
    WHERE id = investment_record.id;
  END LOOP;
  
  -- Process stable investments (full payout at maturity)
  FOR investment_record IN 
    SELECT ui.*, ip.package_type
    FROM public.user_investments ui
    JOIN public.investment_packages ip ON ui.package_id = ip.id
    WHERE ui.status = 'active' 
    AND ip.package_type = 'stable'
    AND ui.is_completed = false
    AND ui.maturity_date <= now()
  LOOP
    -- Pay full return amount
    UPDATE public.profiles 
    SET wallet_balance = wallet_balance + investment_record.return_amount
    WHERE id = investment_record.user_id;
    
    -- Record final payout
    INSERT INTO public.daily_payouts (investment_id, amount, payout_type)
    VALUES (investment_record.id, investment_record.return_amount, 'final_payout');
    
    -- Mark investment as completed
    UPDATE public.user_investments
    SET 
      is_completed = true,
      status = 'completed'
    WHERE id = investment_record.id;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update existing packages to have package_type
UPDATE public.investment_packages 
SET package_type = 'stable' 
WHERE package_type IS NULL;

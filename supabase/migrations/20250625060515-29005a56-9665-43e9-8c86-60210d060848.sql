
-- Create user profiles table to store additional user information
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text NOT NULL,
  referral_code text UNIQUE NOT NULL,
  referred_by uuid REFERENCES public.profiles(id),
  wallet_balance decimal(15,2) DEFAULT 0.00 NOT NULL,
  is_active boolean DEFAULT false NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Create investment packages table
CREATE TABLE public.investment_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  amount decimal(15,2) NOT NULL,
  return_amount decimal(15,2) NOT NULL,
  duration_days integer NOT NULL,
  max_purchases integer DEFAULT 3 NOT NULL,
  is_active boolean DEFAULT true NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Create user investments table
CREATE TABLE public.user_investments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  package_id uuid REFERENCES public.investment_packages(id) ON DELETE CASCADE NOT NULL,
  amount decimal(15,2) NOT NULL,
  return_amount decimal(15,2) NOT NULL,
  start_date timestamp with time zone DEFAULT now() NOT NULL,
  maturity_date timestamp with time zone NOT NULL,
  status text DEFAULT 'active' NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Create withdrawal requests table
CREATE TABLE public.withdrawal_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  amount decimal(15,2) NOT NULL,
  fee decimal(15,2) NOT NULL,
  net_amount decimal(15,2) NOT NULL,
  status text DEFAULT 'pending' NOT NULL,
  requested_at timestamp with time zone DEFAULT now() NOT NULL,
  processed_at timestamp with time zone,
  processed_by uuid REFERENCES public.profiles(id)
);

-- Create admin users table
CREATE TABLE public.admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  is_active boolean DEFAULT true NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investment_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.withdrawal_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create RLS policies for investment packages (readable by all authenticated users)
CREATE POLICY "Authenticated users can view active packages" ON public.investment_packages
  FOR SELECT TO authenticated USING (is_active = true);

-- Create RLS policies for user investments
CREATE POLICY "Users can view their own investments" ON public.user_investments
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create their own investments" ON public.user_investments
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Create RLS policies for withdrawal requests
CREATE POLICY "Users can view their own withdrawal requests" ON public.withdrawal_requests
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create their own withdrawal requests" ON public.withdrawal_requests
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  ref_code text;
BEGIN
  -- Generate unique referral code
  ref_code := 'INV-' || UPPER(SUBSTRING(NEW.raw_user_meta_data->>'first_name', 1, 1)) || 
              UPPER(SUBSTRING(NEW.raw_user_meta_data->>'last_name', 1, 1)) || '-' || 
              EXTRACT(year FROM now())::text;
  
  -- Make it unique by adding random suffix if needed
  WHILE EXISTS (SELECT 1 FROM public.profiles WHERE referral_code = ref_code) LOOP
    ref_code := ref_code || '-' || FLOOR(RANDOM() * 1000)::text;
  END LOOP;

  INSERT INTO public.profiles (
    id,
    first_name,
    last_name,
    phone,
    referral_code,
    wallet_balance,
    is_active
  ) VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    NEW.raw_user_meta_data->>'phone',
    ref_code,
    0.00,
    false
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert default investment packages
INSERT INTO public.investment_packages (name, amount, return_amount, duration_days) VALUES
('Starter Package', 25000.00, 30000.00, 30),
('Gold Package', 50000.00, 65000.00, 45),
('Platinum Package', 100000.00, 135000.00, 60);

-- Insert admin user (password: admin123)
INSERT INTO public.admin_users (email, password_hash) VALUES
('admin@investx.rw', '$2b$10$8K1p/a0dqbVkDF5sWlq6w.ZGcfF1PHOzQJ.jjjQw8X9GmSzfqVoiq');


-- Enable RLS on profiles table if not already enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create a security definer function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if the current authenticated user's email is in the admin list
  RETURN (
    SELECT CASE 
      WHEN auth.jwt() ->> 'email' = 'gadyishimwe1@gmail.com' THEN true
      ELSE false
    END
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Create RLS policies for profiles table
-- Allow users to view their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Allow users to update their own profile  
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Allow admin to view all profiles
CREATE POLICY "Admin can view all profiles" ON public.profiles
  FOR SELECT USING (public.is_current_user_admin());

-- Allow admin to update all profiles
CREATE POLICY "Admin can update all profiles" ON public.profiles
  FOR UPDATE USING (public.is_current_user_admin());

-- Allow admin to delete profiles
CREATE POLICY "Admin can delete profiles" ON public.profiles
  FOR DELETE USING (public.is_current_user_admin());

-- Enable RLS on other tables and create admin policies
ALTER TABLE public.investment_packages ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view active investment packages
CREATE POLICY "Anyone can view active packages" ON public.investment_packages
  FOR SELECT USING (is_active = true);

-- Allow admin to manage all investment packages
CREATE POLICY "Admin can manage packages" ON public.investment_packages
  FOR ALL USING (public.is_current_user_admin());

-- Enable RLS on withdrawal_requests
ALTER TABLE public.withdrawal_requests ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own withdrawal requests
CREATE POLICY "Users can view own withdrawals" ON public.withdrawal_requests
  FOR SELECT USING (auth.uid() = user_id);

-- Allow users to create their own withdrawal requests
CREATE POLICY "Users can create withdrawals" ON public.withdrawal_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow admin to view and manage all withdrawal requests
CREATE POLICY "Admin can manage all withdrawals" ON public.withdrawal_requests
  FOR ALL USING (public.is_current_user_admin());

-- Enable RLS on user_investments
ALTER TABLE public.user_investments ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own investments
CREATE POLICY "Users can view own investments" ON public.user_investments
  FOR SELECT USING (auth.uid() = user_id);

-- Allow users to create their own investments
CREATE POLICY "Users can create investments" ON public.user_investments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow admin to view and manage all investments
CREATE POLICY "Admin can manage all investments" ON public.user_investments
  FOR ALL USING (public.is_current_user_admin());


import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  TrendingUp, 
  Wallet, 
  Users, 
  ArrowUpRight, 
  Clock, 
  Gift,
  LogOut,
  Copy,
  DollarSign
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

interface InvestmentPackage {
  id: string;
  name: string;
  amount: number;
  return_amount: number;
  duration_days: number;
  max_purchases: number;
}

interface UserInvestment {
  id: string;
  package_id: string;
  amount: number;
  return_amount: number;
  start_date: string;
  maturity_date: string;
  status: string;
  investment_packages: InvestmentPackage;
}

interface WithdrawalRequest {
  id: string;
  amount: number;
  fee: number;
  net_amount: number;
  status: string;
  requested_at: string;
}

const Dashboard = () => {
  const { profile, signOut, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [packages, setPackages] = useState<InvestmentPackage[]>([]);
  const [investments, setInvestments] = useState<UserInvestment[]>([]);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([]);
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch investment packages
      const { data: packagesData } = await supabase
        .from('investment_packages')
        .select('*')
        .eq('is_active', true);

      // Fetch user investments
      const { data: investmentsData } = await supabase
        .from('user_investments')
        .select(`
          *,
          investment_packages (*)
        `)
        .eq('user_id', profile?.id);

      // Fetch withdrawal requests
      const { data: withdrawalsData } = await supabase
        .from('withdrawal_requests')
        .select('*')
        .eq('user_id', profile?.id)
        .order('requested_at', { ascending: false });

      setPackages(packagesData || []);
      setInvestments(investmentsData || []);
      setWithdrawals(withdrawalsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInvestment = async (packageData: InvestmentPackage) => {
    if (!profile || profile.wallet_balance < packageData.amount) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough balance to make this investment.",
        variant: "destructive",
      });
      return;
    }

    // Check investment count for this package
    const packageInvestments = investments.filter(inv => inv.package_id === packageData.id);
    if (packageInvestments.length >= packageData.max_purchases) {
      toast({
        title: "Investment Limit Reached",
        description: `You can only invest in this package ${packageData.max_purchases} times.`,
        variant: "destructive",
      });
      return;
    }

    try {
      const maturityDate = new Date();
      maturityDate.setDate(maturityDate.getDate() + packageData.duration_days);

      // Create investment
      const { error: investError } = await supabase
        .from('user_investments')
        .insert({
          user_id: profile.id,
          package_id: packageData.id,
          amount: packageData.amount,
          return_amount: packageData.return_amount,
          maturity_date: maturityDate.toISOString()
        });

      if (investError) throw investError;

      // Update wallet balance
      const { error: walletError } = await supabase
        .from('profiles')
        .update({ 
          wallet_balance: profile.wallet_balance - packageData.amount 
        })
        .eq('id', profile.id);

      if (walletError) throw walletError;

      toast({
        title: "Investment Successful!",
        description: `You have invested ${packageData.amount.toLocaleString()} RWF in ${packageData.name}.`,
      });

      await refreshProfile();
      await fetchData();
    } catch (error) {
      console.error('Investment error:', error);
      toast({
        title: "Investment Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleWithdrawal = async () => {
    const amount = parseFloat(withdrawalAmount);
    if (!amount || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid withdrawal amount.",
        variant: "destructive",
      });
      return;
    }

    if (!profile || profile.wallet_balance < amount) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough balance for this withdrawal.",
        variant: "destructive",
      });
      return;
    }

    // Check if it's a weekday (Monday-Friday)
    const today = new Date();
    const dayOfWeek = today.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      toast({
        title: "Withdrawal Not Allowed",
        description: "Withdrawals are only allowed Monday through Friday.",
        variant: "destructive",
      });
      return;
    }

    try {
      const fee = amount * 0.1; // 10% fee
      const netAmount = amount - fee;

      // Create withdrawal request
      const { error: withdrawError } = await supabase
        .from('withdrawal_requests')
        .insert({
          user_id: profile.id,
          amount: amount,
          fee: fee,
          net_amount: netAmount
        });

      if (withdrawError) throw withdrawError;

      // Update wallet balance (deduct immediately)
      const { error: walletError } = await supabase
        .from('profiles')
        .update({ 
          wallet_balance: profile.wallet_balance - amount 
        })
        .eq('id', profile.id);

      if (walletError) throw walletError;

      toast({
        title: "Withdrawal Request Submitted",
        description: `Your withdrawal request for ${amount.toLocaleString()} RWF has been submitted for approval.`,
      });

      setWithdrawalAmount('');
      await refreshProfile();
      await fetchData();
    } catch (error) {
      console.error('Withdrawal error:', error);
      toast({
        title: "Withdrawal Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const copyReferralLink = () => {
    const link = `${window.location.origin}/register?ref=${profile?.referral_code}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard.",
    });
  };

  const getInvestmentProgress = (startDate: string, maturityDate: string) => {
    const start = new Date(startDate);
    const end = new Date(maturityDate);
    const now = new Date();
    
    const totalDuration = end.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    
    return Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);
  };

  const getDaysRemaining = (maturityDate: string) => {
    const end = new Date(maturityDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(diffDays, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-xl font-bold text-gray-900">InvestX Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {profile?.first_name} {profile?.last_name}
              </span>
              <Button variant="outline" size="sm" onClick={signOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Wallet Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profile?.wallet_balance?.toLocaleString() || '0'} RWF</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{investments.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Referrals</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Investment Packages */}
          <Card>
            <CardHeader>
              <CardTitle>Investment Packages</CardTitle>
              <CardDescription>Choose a package to start investing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {packages.map((pkg) => {
                const userInvestments = investments.filter(inv => inv.package_id === pkg.id);
                const canInvest = userInvestments.length < pkg.max_purchases;
                
                return (
                  <div key={pkg.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{pkg.name}</h3>
                      <Badge variant={canInvest ? "default" : "secondary"}>
                        {userInvestments.length}/{pkg.max_purchases}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>Investment: {pkg.amount.toLocaleString()} RWF</p>
                      <p>Returns: {pkg.return_amount.toLocaleString()} RWF</p>
                      <p>Duration: {pkg.duration_days} days</p>
                      <p>Profit: {(pkg.return_amount - pkg.amount).toLocaleString()} RWF</p>
                    </div>
                    <Button 
                      className="w-full mt-3" 
                      disabled={!canInvest || (profile?.wallet_balance || 0) < pkg.amount}
                      onClick={() => handleInvestment(pkg)}
                    >
                      {!canInvest ? 'Limit Reached' : 'Invest Now'}
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Active Investments */}
          <Card>
            <CardHeader>
              <CardTitle>Active Investments</CardTitle>
              <CardDescription>Track your investment progress</CardDescription>
            </CardHeader>
            <CardContent>
              {investments.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No active investments yet</p>
              ) : (
                <div className="space-y-4">
                  {investments.map((investment) => {
                    const progress = getInvestmentProgress(investment.start_date, investment.maturity_date);
                    const daysRemaining = getDaysRemaining(investment.maturity_date);
                    
                    return (
                      <div key={investment.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">{investment.investment_packages.name}</h3>
                          <Badge>Active</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{Math.round(progress)}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Invested: {investment.amount.toLocaleString()} RWF</span>
                            <span>Returns: {investment.return_amount.toLocaleString()} RWF</span>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>{daysRemaining} days remaining</span>
                            <span>Profit: {(investment.return_amount - investment.amount).toLocaleString()} RWF</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Referral System */}
          <Card>
            <CardHeader>
              <CardTitle>Referral System</CardTitle>
              <CardDescription>Invite friends and earn bonuses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold mb-2">Your Referral Code</h3>
                <div className="flex items-center justify-between bg-white p-3 rounded border">
                  <span className="font-mono">{profile?.referral_code}</span>
                  <Button variant="outline" size="sm" onClick={copyReferralLink}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Earn bonuses when your referrals activate their accounts</p>
                <p>• Share your referral code with friends and family</p>
                <p>• Track your referral earnings in real-time</p>
              </div>
            </CardContent>
          </Card>

          {/* Withdrawal Section */}
          <Card>
            <CardHeader>
              <CardTitle>Request Withdrawal</CardTitle>
              <CardDescription>Withdraw your funds (Monday-Friday only)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="withdrawal">Withdrawal Amount (RWF)</Label>
                <Input
                  id="withdrawal"
                  type="number"
                  placeholder="Enter amount"
                  value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  10% processing fee applies. Available balance: {profile?.wallet_balance?.toLocaleString() || '0'} RWF
                </p>
              </div>
              
              <Button onClick={handleWithdrawal} className="w-full">
                Request Withdrawal
              </Button>

              {withdrawals.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="font-semibold text-sm">Recent Withdrawals</h4>
                  {withdrawals.slice(0, 3).map((withdrawal) => (
                    <div key={withdrawal.id} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                      <span>{withdrawal.amount.toLocaleString()} RWF</span>
                      <Badge variant={
                        withdrawal.status === 'approved' ? 'default' :
                        withdrawal.status === 'rejected' ? 'destructive' : 'secondary'
                      }>
                        {withdrawal.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

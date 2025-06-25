
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Wallet, 
  TrendingUp, 
  Users, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  Copy,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    walletBalance: 0,
    totalInvested: 0,
    totalReturns: 0,
    referralCount: 0,
    isActive: false,
    referralCode: 'INV-JD-2024'
  });

  const [investments, setInvestments] = useState([
    {
      id: 1,
      packageName: 'Starter Package',
      amount: 25000,
      returnAmount: 30000,
      maturityDate: '2024-07-15',
      status: 'active',
      progress: 65
    },
    {
      id: 2,
      packageName: 'Gold Package',
      amount: 50000,
      returnAmount: 65000,
      maturityDate: '2024-08-20',
      status: 'active',
      progress: 40
    }
  ]);

  const [packages, setPackages] = useState([
    {
      id: 1,
      name: 'Starter Package',
      amount: 25000,
      returnAmount: 30000,
      duration: 30,
      maxPurchases: 3,
      userPurchases: 1
    },
    {
      id: 2,
      name: 'Gold Package',
      amount: 50000,
      returnAmount: 65000,
      duration: 45,
      maxPurchases: 3,
      userPurchases: 1
    },
    {
      id: 3,
      name: 'Platinum Package',
      amount: 100000,
      returnAmount: 135000,
      duration: 60,
      maxPurchases: 3,
      userPurchases: 0
    }
  ]);

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  const handleInvestment = (packageItem: any) => {
    if (!user.isActive) {
      toast({
        title: "Account Not Active",
        description: "Please complete your activation payment first.",
        variant: "destructive",
      });
      return;
    }

    if (packageItem.userPurchases >= packageItem.maxPurchases) {
      toast({
        title: "Maximum Purchases Reached",
        description: `You can only invest in this package ${packageItem.maxPurchases} times.`,
        variant: "destructive",
      });
      return;
    }

    if (user.walletBalance < packageItem.amount) {
      toast({
        title: "Insufficient Balance",
        description: "Please add funds to your wallet.",
        variant: "destructive",
      });
      return;
    }

    // Deduct from wallet and add investment
    setUser(prev => ({
      ...prev,
      walletBalance: prev.walletBalance - packageItem.amount,
      totalInvested: prev.totalInvested + packageItem.amount
    }));

    // Update package purchase count
    setPackages(prev => prev.map(pkg => 
      pkg.id === packageItem.id 
        ? { ...pkg, userPurchases: pkg.userPurchases + 1 }
        : pkg
    ));

    toast({
      title: "Investment Successful!",
      description: `You've invested ${packageItem.amount.toLocaleString()} RWF in ${packageItem.name}.`,
    });
  };

  const copyReferralCode = () => {
    const referralLink = `https://investx.rw/register?ref=${user.referralCode}`;
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Referral Link Copied!",
      description: "Share this link to earn referral bonuses.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">InvestX</span>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={user.isActive ? "default" : "destructive"}>
                {user.isActive ? "Active" : "Pending Activation"}
              </Badge>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Here's what's happening with your investments today.</p>
        </div>

        {/* Account Not Active Warning */}
        {!user.isActive && (
          <Card className="mb-8 border-yellow-200 bg-yellow-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-yellow-800">Account Activation Required</h3>
                  <p className="text-yellow-700">
                    Your account is pending activation. Please complete your 5,000 RWF payment to start investing.
                  </p>
                  <div className="mt-4 p-4 bg-white rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Send 5,000 RWF via MTN Mobile Money to: <strong>+250 736 563 999</strong></p>
                    <a
                      href="https://wa.me/250736563999?text=Hello%2C%20I%20sent%20the%205000%20RWF%20payment%2C%20here%20is%20my%20screenshot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors"
                    >
                      Send Screenshot via WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.walletBalance.toLocaleString()} RWF</div>
              <p className="text-xs text-muted-foreground">Available for investment</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.totalInvested.toLocaleString()} RWF</div>
              <p className="text-xs text-muted-foreground">Across all packages</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expected Returns</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.totalReturns.toLocaleString()} RWF</div>
              <p className="text-xs text-muted-foreground">Total expected profit</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Referrals</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.referralCount}</div>
              <p className="text-xs text-muted-foreground">Active referrals</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="investments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="investments">My Investments</TabsTrigger>
            <TabsTrigger value="packages">Available Packages</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
            <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
          </TabsList>

          <TabsContent value="investments" className="space-y-6">
            <div className="grid gap-6">
              {investments.map((investment) => (
                <Card key={investment.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{investment.packageName}</CardTitle>
                        <CardDescription>
                          Maturity Date: {new Date(investment.maturityDate).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="text-green-600">
                        {investment.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Invested Amount</p>
                        <p className="text-lg font-semibold">{investment.amount.toLocaleString()} RWF</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Expected Return</p>
                        <p className="text-lg font-semibold text-green-600">{investment.returnAmount.toLocaleString()} RWF</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Profit</p>
                        <p className="text-lg font-semibold text-blue-600">
                          {(investment.returnAmount - investment.amount).toLocaleString()} RWF
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Progress</span>
                        <span className="text-sm font-medium">{investment.progress}%</span>
                      </div>
                      <Progress value={investment.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
              {investments.length === 0 && (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-gray-500">No active investments yet. Start investing to see them here!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="packages" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <Card key={pkg.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{pkg.name}</CardTitle>
                    <CardDescription>{pkg.duration} days investment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Investment</p>
                          <p className="text-lg font-semibold">{pkg.amount.toLocaleString()} RWF</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Returns</p>
                          <p className="text-lg font-semibold text-green-600">{pkg.returnAmount.toLocaleString()} RWF</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Profit</p>
                        <p className="text-xl font-bold text-blue-600">
                          {(pkg.returnAmount - pkg.amount).toLocaleString()} RWF
                        </p>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>Purchases: {pkg.userPurchases}/{pkg.maxPurchases}</p>
                        <p>Duration: {pkg.duration} days</p>
                      </div>
                      <Button 
                        className="w-full" 
                        onClick={() => handleInvestment(pkg)}
                        disabled={!user.isActive || pkg.userPurchases >= pkg.maxPurchases || user.walletBalance < pkg.amount}
                      >
                        {pkg.userPurchases >= pkg.maxPurchases ? 'Max Reached' : 'Invest Now'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="referrals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Referral Program</CardTitle>
                <CardDescription>
                  Earn bonuses by referring friends and family to InvestX
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Your Referral Code</h3>
                    <div className="flex items-center space-x-2">
                      <code className="bg-white px-3 py-2 rounded border flex-1">{user.referralCode}</code>
                      <Button variant="outline" onClick={copyReferralCode}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Share your referral link: https://investx.rw/register?ref={user.referralCode}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{user.referralCount}</p>
                      <p className="text-sm text-gray-600">Total Referrals</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">0</p>
                      <p className="text-sm text-gray-600">This Month</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">0 RWF</p>
                      <p className="text-sm text-gray-600">Earned This Month</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="withdrawals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Withdrawal Requests</CardTitle>
                <CardDescription>
                  Request withdrawals from your wallet (Monday-Friday only)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Withdrawal Policy</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Minimum withdrawal: 10,000 RWF</li>
                      <li>• Withdrawal fee: 10% of amount</li>
                      <li>• Processing time: 1-3 business days</li>
                      <li>• Available: Monday to Friday only</li>
                    </ul>
                  </div>
                  
                  <Button className="w-full" disabled={user.walletBalance < 10000}>
                    Request Withdrawal
                  </Button>
                  
                  <div className="text-center text-sm text-gray-500">
                    No withdrawal requests yet
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;

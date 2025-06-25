import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Shield, 
  Users, 
  Package, 
  Wallet, 
  TrendingUp,
  LogOut,
  Check,
  X,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 156,
    activeUsers: 89,
    pendingActivations: 12,
    totalInvestments: 2850000,
    pendingWithdrawals: 450000,
    totalPackages: 3
  });

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+250123456789',
      walletBalance: 0,
      totalInvested: 0,
      isActive: false,
      joinDate: '2024-01-15',
      referralCode: 'INV-JD-2024'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+250987654321',
      walletBalance: 125000,
      totalInvested: 75000,
      isActive: true,
      joinDate: '2024-01-10',
      referralCode: 'INV-JS-2024'
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
      isActive: true
    },
    {
      id: 2,
      name: 'Gold Package',
      amount: 50000,
      returnAmount: 65000,
      duration: 45,
      maxPurchases: 3,
      isActive: true
    },
    {
      id: 3,
      name: 'Platinum Package',
      amount: 100000,
      returnAmount: 135000,
      duration: 60,
      maxPurchases: 3,
      isActive: true
    }
  ]);

  const [withdrawals, setWithdrawals] = useState([
    {
      id: 1,
      userId: 2,
      userName: 'Jane Smith',
      amount: 50000,
      fee: 5000,
      netAmount: 45000,
      status: 'pending',
      requestDate: '2024-01-20'
    }
  ]);

  const [newPackage, setNewPackage] = useState({
    name: '',
    amount: '',
    returnAmount: '',
    duration: '',
    maxPurchases: '3'
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated admin
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userType = localStorage.getItem('userType');
    if (!isAuthenticated || userType !== 'admin') {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
    navigate('/admin/login');
  };

  const handleUserActivation = (userId: number, activate: boolean) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, isActive: activate, walletBalance: activate ? 5000 : 0 }
        : user
    ));

    toast({
      title: activate ? "User Activated" : "User Deactivated",
      description: activate ? "User account has been activated and 5,000 RWF added to wallet." : "User account has been deactivated.",
    });
  };

  const handleWalletAdjustment = (userId: number, amount: number) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, walletBalance: Math.max(0, user.walletBalance + amount) }
        : user
    ));

    toast({
      title: "Wallet Updated",
      description: `${amount > 0 ? 'Added' : 'Deducted'} ${Math.abs(amount).toLocaleString()} RWF ${amount > 0 ? 'to' : 'from'} user wallet.`,
    });
  };

  const handleWithdrawalAction = (withdrawalId: number, approve: boolean) => {
    setWithdrawals(prev => prev.map(withdrawal => 
      withdrawal.id === withdrawalId 
        ? { ...withdrawal, status: approve ? 'approved' : 'rejected' }
        : withdrawal
    ));

    toast({
      title: approve ? "Withdrawal Approved" : "Withdrawal Rejected",
      description: approve ? "Withdrawal has been approved for processing." : "Withdrawal request has been rejected.",
    });
  };

  const handleCreatePackage = () => {
    if (!newPackage.name || !newPackage.amount || !newPackage.returnAmount || !newPackage.duration) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const packageData = {
      id: packages.length + 1,
      name: newPackage.name,
      amount: parseInt(newPackage.amount),
      returnAmount: parseInt(newPackage.returnAmount),
      duration: parseInt(newPackage.duration),
      maxPurchases: parseInt(newPackage.maxPurchases),
      isActive: true
    };

    setPackages(prev => [...prev, packageData]);
    setNewPackage({ name: '', amount: '', returnAmount: '', duration: '', maxPurchases: '3' });

    toast({
      title: "Package Created",
      description: "New investment package has been created successfully.",
    });
  };

  const handleDeletePackage = (packageId: number) => {
    setPackages(prev => prev.filter(pkg => pkg.id !== packageId));
    toast({
      title: "Package Deleted",
      description: "Investment package has been deleted.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-red-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">InvestX Admin</span>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="destructive">Administrator</Badge>
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
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, packages, and system operations.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.activeUsers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Users className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pendingActivations}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(stats.totalInvestments / 1000000).toFixed(1)}M</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Withdrawals</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(stats.pendingWithdrawals / 1000).toFixed(0)}K</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Packages</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPackages}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="packages">Package Management</TabsTrigger>
            <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
            <TabsTrigger value="system">System Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user accounts, activations, and wallet balances</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h3 className="font-semibold">{user.name}</h3>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <p className="text-sm text-gray-600">{user.phone}</p>
                          </div>
                          <Badge variant={user.isActive ? "default" : "destructive"}>
                            {user.isActive ? "Active" : "Pending"}
                          </Badge>
                        </div>
                        <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Wallet: </span>
                            <span className="font-medium">{user.walletBalance.toLocaleString()} RWF</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Invested: </span>
                            <span className="font-medium">{user.totalInvested.toLocaleString()} RWF</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Joined: </span>
                            <span className="font-medium">{user.joinDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button
                          size="sm"
                          variant={user.isActive ? "destructive" : "default"}
                          onClick={() => handleUserActivation(user.id, !user.isActive)}
                        >
                          {user.isActive ? "Deactivate" : "Activate"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleWalletAdjustment(user.id, 10000)}
                        >
                          +10K
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleWalletAdjustment(user.id, -10000)}
                        >
                          -10K
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="packages" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Create New Package */}
              <Card>
                <CardHeader>
                  <CardTitle>Create New Package</CardTitle>
                  <CardDescription>Add a new investment package</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="packageName">Package Name</Label>
                      <Input
                        id="packageName"
                        placeholder="e.g., Premium Package"
                        value={newPackage.name}
                        onChange={(e) => setNewPackage({...newPackage, name: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Investment Amount (RWF)</Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="25000"
                          value={newPackage.amount}
                          onChange={(e) => setNewPackage({...newPackage, amount: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="returnAmount">Return Amount (RWF)</Label>
                        <Input
                          id="returnAmount"
                          type="number"
                          placeholder="30000"
                          value={newPackage.returnAmount}
                          onChange={(e) => setNewPackage({...newPackage, returnAmount: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration (Days)</Label>
                        <Input
                          id="duration"
                          type="number"
                          placeholder="30"
                          value={newPackage.duration}
                          onChange={(e) => setNewPackage({...newPackage, duration: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maxPurchases">Max Purchases</Label>
                        <Input
                          id="maxPurchases"
                          type="number"
                          placeholder="3"
                          value={newPackage.maxPurchases}
                          onChange={(e) => setNewPackage({...newPackage, maxPurchases: e.target.value})}
                        />
                      </div>
                    </div>
                    <Button onClick={handleCreatePackage} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Package
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Existing Packages */}
              <Card>
                <CardHeader>
                  <CardTitle>Existing Packages</CardTitle>
                  <CardDescription>Manage current investment packages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {packages.map((pkg) => (
                      <div key={pkg.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-semibold">{pkg.name}</h3>
                          <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
                            <span>Amount: {pkg.amount.toLocaleString()} RWF</span>
                            <span>Return: {pkg.returnAmount.toLocaleString()} RWF</span>
                            <span>Duration: {pkg.duration} days</span>
                            <span>Max: {pkg.maxPurchases} purchases</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDeletePackage(pkg.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="withdrawals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Withdrawal Requests</CardTitle>
                <CardDescription>Approve or reject user withdrawal requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {withdrawals.map((withdrawal) => (
                    <div key={withdrawal.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{withdrawal.userName}</h3>
                        <div className="grid grid-cols-3 gap-4 mt-2 text-sm">
                          <div>
                            <span className="text-gray-600">Amount: </span>
                            <span className="font-medium">{withdrawal.amount.toLocaleString()} RWF</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Fee: </span>
                            <span className="font-medium">{withdrawal.fee.toLocaleString()} RWF</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Net: </span>
                            <span className="font-medium">{withdrawal.netAmount.toLocaleString()} RWF</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Requested: {withdrawal.requestDate}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={
                          withdrawal.status === 'approved' ? 'default' : 
                          withdrawal.status === 'rejected' ? 'destructive' : 'secondary'
                        }>
                          {withdrawal.status}
                        </Badge>
                        {withdrawal.status === 'pending' && (
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() => handleWithdrawalAction(withdrawal.id, true)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleWithdrawalAction(withdrawal.id, false)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {withdrawals.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No withdrawal requests at this time.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Statistics</CardTitle>
                  <CardDescription>Overview of platform performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">{stats.totalUsers}</p>
                        <p className="text-sm text-gray-600">Total Users</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">{stats.activeUsers}</p>
                        <p className="text-sm text-gray-600">Active Users</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-2xl font-bold text-purple-600">
                          {(stats.totalInvestments / 1000000).toFixed(1)}M
                        </p>
                        <p className="text-sm text-gray-600">Total Invested (RWF)</p>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <p className="text-2xl font-bold text-orange-600">
                          {(stats.pendingWithdrawals / 1000).toFixed(0)}K
                        </p>
                        <p className="text-sm text-gray-600">Pending Withdrawals</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button className="w-full" variant="outline">
                      Export User Data
                    </Button>
                    <Button className="w-full" variant="outline">
                      Generate Reports
                    </Button>
                    <Button className="w-full" variant="outline">
                      System Backup
                    </Button>
                    <Button className="w-full" variant="outline">
                      Send Notifications
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;

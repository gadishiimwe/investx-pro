
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { adminSignIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await adminSignIn(formData.email, formData.password);
      
      if (error) {
        toast({
          title: "Access Denied",
          description: error.message || "Invalid admin credentials.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Admin Access Granted",
          description: "Welcome to the admin dashboard.",
        });
        navigate('/admin/dashboard');
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-2xl font-bold text-gray-900 mb-2">
            <Shield className="h-8 w-8 text-red-600 mr-2" />
            InvestX Admin
          </Link>
          <p className="text-gray-600">Secure administrative access</p>
        </div>

        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-700">Administrator Login</CardTitle>
            <CardDescription>
              Enter your admin credentials to access the control panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Admin Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@investx.rw"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Admin Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter admin password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
                {isLoading ? "Authenticating..." : "Access Admin Panel"}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-gray-600">
                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                  ← Back to User Login
                </Link>
              </p>
            </div>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-sm font-medium text-red-700 mb-2">Demo Admin Credentials:</p>
              <p className="text-xs text-red-600">Email: admin@investx.rw</p>
              <p className="text-xs text-red-600">Password: admin123</p>
              <p className="text-xs text-red-600 mt-2">Note: You need to register this email first with Supabase auth</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;

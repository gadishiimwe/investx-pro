
import React, { useState, useEffect } from 'react';
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
  const { signIn, user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user && isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [user, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Admin login attempt for:', formData.email);
      const { error } = await signIn(formData.email, formData.password);
      
      if (error) {
        console.error('Admin login failed:', error);
        toast({
          title: "Login Failed",
          description: error.message || "Invalid credentials. Please check your email and password.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login Successful",
          description: "Redirecting to admin dashboard...",
        });
      }
    } catch (error) {
      console.error('Admin login exception:', error);
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-2xl font-bold text-gray-900 mb-2">
            <Shield className="h-8 w-8 text-red-600 mr-2" />
            InvestX Admin
          </Link>
          <p className="text-gray-600">Administrative Access Portal</p>
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
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
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
                {isLoading ? "Signing In..." : "Access Admin Panel"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/login" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                ← Back to User Login
              </Link>
            </div>

            <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-sm font-medium text-red-700 mb-2">Setup Instructions:</p>
              <p className="text-xs text-red-600">1. Register admin@investx.rw through normal signup</p>
              <p className="text-xs text-red-600">2. Use those same credentials here for admin access</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;

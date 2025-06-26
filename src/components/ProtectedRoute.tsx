
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Copy } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, profile, loading, isAdmin } = useAuth();
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Phone number copied to clipboard.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Admin users bypass activation requirement
  if (isAdmin) {
    return <>{children}</>;
  }

  if (!profile?.is_active) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Card className="border-orange-200">
            <CardHeader className="text-center">
              <AlertCircle className="h-12 w-12 text-orange-600 mx-auto mb-2" />
              <CardTitle className="text-orange-700">Account Activation Required</CardTitle>
              <CardDescription>
                Your account is pending activation. Please complete the payment process.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Account Activation Fee</h3>
                <p className="text-3xl font-bold text-blue-600">5,000 RWF</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Step 1: Send Payment</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Send 5,000 RWF via MTN Mobile Money to:
                  </p>
                  <div className="flex items-center justify-between bg-white p-3 rounded border">
                    <span className="font-mono text-lg">+250 736 563 999</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard('+250736563999')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Step 2: Send Confirmation</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Send your payment screenshot via WhatsApp:
                  </p>
                  <a
                    href="https://wa.me/250736563999?text=Hello%2C%20I%20sent%20the%205000%20RWF%20payment%2C%20here%20is%20my%20screenshot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors w-full justify-center"
                  >
                    Send via WhatsApp
                  </a>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Step 3: Account Activation</h4>
                  <p className="text-sm text-gray-600">
                    Once payment is confirmed, admin will activate your account and you can start investing.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = '/'}
                  className="w-full"
                >
                  Return to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;


import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Shield, TrendingUp, Users, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">InvestX</span>
            </div>
            <div className="flex space-x-4">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Start Your Investment
              <span className="text-blue-600"> Journey</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join thousands of investors building wealth through our secure, regulated investment platform. 
              Start with just 5,000 RWF and watch your money grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="text-lg px-8 py-4">
                  Start Investing Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose InvestX?</h2>
            <p className="text-xl text-gray-600">Secure, simple, and profitable investment solutions</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>100% Secure</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Your investments are protected with bank-level security and encryption
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>High Returns</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Competitive returns on your investments with multiple package options
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Referral Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Earn bonuses by referring friends and family to join InvestX
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Wallet className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <CardTitle>Easy Withdrawals</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Withdraw your profits easily with our streamlined process
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get started in just 3 simple steps</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Register & Activate</h3>
              <p className="text-gray-600">
                Create your account and activate it with a 5,000 RWF payment via Mobile Money
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Investment</h3>
              <p className="text-gray-600">
                Select from our variety of investment packages that suit your goals
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Earn & Withdraw</h3>
              <p className="text-gray-600">
                Watch your investments grow and withdraw your profits anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Instructions */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Start?</h2>
          <div className="bg-white/10 rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold mb-4">Activation Payment</h3>
            <p className="text-lg mb-4">Send 5,000 RWF via MTN Mobile Money to:</p>
            <p className="text-2xl font-bold mb-4">+250 736 563 999</p>
            <p className="mb-4">Then send screenshot via WhatsApp:</p>
            <a 
              href="https://wa.me/250736563999?text=Hello%2C%20I%20sent%20the%205000%20RWF%20payment%2C%20here%20is%20my%20screenshot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-white font-semibold transition-colors"
            >
              Send via WhatsApp
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              Register Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <TrendingUp className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-2xl font-bold">InvestX</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner in building wealth through smart investments.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/how-it-works" className="hover:text-white">How It Works</Link></li>
                <li><Link to="/packages" className="hover:text-white">Investment Packages</Link></li>
                <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Account</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/login" className="hover:text-white">Login</Link></li>
                <li><Link to="/register" className="hover:text-white">Register</Link></li>
                <li><Link to="/admin" className="hover:text-white">Admin</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Phone: +250 736 563 999</li>
                <li>Email: support@investx.rw</li>
                <li>WhatsApp Support</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 InvestX. All rights reserved. | Secure Investment Platform</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

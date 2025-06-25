
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, ArrowRight, Shield, Smartphone, DollarSign, Users, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">InvestX</span>
            </Link>
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
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How InvestX Works
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Start your investment journey in just 3 simple steps. Our secure platform makes investing easy and profitable.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-2xl font-semibold mb-4">Register & Activate</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Create your account with your basic information. Then activate your account by making a one-time payment of 5,000 RWF via Mobile Money to get started.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-600 text-white rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-2xl font-semibold mb-4">Choose Investment Package</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Select from our variety of investment packages that match your financial goals and risk tolerance. Each package offers competitive returns and flexible terms.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-600 text-white rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-2xl font-semibold mb-4">Earn & Withdraw</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Watch your investments grow with regular returns. Withdraw your profits easily through our streamlined mobile money process whenever you need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Our Process Works</h2>
            <p className="text-xl text-gray-600">Built for security, simplicity, and success</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Shield className="h-10 w-10 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Bank-Level Security</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Your funds and data are protected with advanced encryption and security protocols.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Smartphone className="h-10 w-10 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Mobile Money Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Easy deposits and withdrawals through MTN Mobile Money for maximum convenience.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <DollarSign className="h-10 w-10 text-purple-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Competitive Returns</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Earn attractive returns on your investments with our carefully managed portfolios.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-10 w-10 text-orange-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Referral Bonuses</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Earn extra income by referring friends and family to join the InvestX platform.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Payment Process */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Activation Process</h2>
            <p className="text-xl opacity-90">Simple payment process to get you started</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CheckCircle className="h-8 w-8 text-green-400 mb-2" />
                <CardTitle className="text-white">Step 1: Send Payment</CardTitle>
              </CardHeader>
              <CardContent className="text-white/90">
                <p className="mb-4">Send 5,000 RWF via MTN Mobile Money to:</p>
                <div className="bg-white/20 p-4 rounded-lg text-center">
                  <span className="text-2xl font-bold">+250 736 563 999</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CheckCircle className="h-8 w-8 text-green-400 mb-2" />
                <CardTitle className="text-white">Step 2: Send Confirmation</CardTitle>
              </CardHeader>
              <CardContent className="text-white/90">
                <p className="mb-4">Send your payment screenshot via WhatsApp for quick activation:</p>
                <a
                  href="https://wa.me/250736563999?text=Hello%2C%20I%20sent%20the%205000%20RWF%20payment%2C%20here%20is%20my%20screenshot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
                >
                  Send via WhatsApp
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Investing?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of investors who are already building wealth with InvestX
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="text-lg px-8 py-4">
                Start Investing Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/packages">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                View Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;

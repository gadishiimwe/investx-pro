
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, ArrowRight, CheckCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const InvestmentPackages = () => {
  const packages = [
    {
      name: "Starter Package",
      amount: "10,000 RWF",
      duration: "30 days",
      returns: "15%",
      totalReturn: "11,500 RWF",
      features: ["Low risk investment", "Perfect for beginners", "Monthly returns", "Easy withdrawal"],
      popular: false
    },
    {
      name: "Growth Package",
      amount: "50,000 RWF",
      duration: "45 days",
      returns: "25%",
      totalReturn: "62,500 RWF",
      features: ["Moderate risk", "Higher returns", "Bi-weekly updates", "Priority support"],
      popular: true
    },
    {
      name: "Premium Package",
      amount: "100,000 RWF",
      duration: "60 days",
      returns: "35%",
      totalReturn: "135,000 RWF",
      features: ["Optimized returns", "Dedicated advisor", "Weekly reports", "VIP support"],
      popular: false
    },
    {
      name: "Elite Package",
      amount: "200,000 RWF",
      duration: "90 days",
      returns: "45%",
      totalReturn: "290,000 RWF",
      features: ["Maximum returns", "Personal portfolio manager", "Daily insights", "24/7 support"],
      popular: false
    }
  ];

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
            Investment Packages
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose the perfect investment package that matches your financial goals and risk appetite.
          </p>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className={`relative ${pkg.popular ? 'ring-2 ring-blue-500 scale-105' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl mb-2">{pkg.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-blue-600">{pkg.amount}</span>
                    <p className="text-gray-600 mt-1">{pkg.duration} investment</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{pkg.returns} Returns</p>
                    <p className="text-sm text-gray-600">Total: {pkg.totalReturn}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/register">
                    <Button className="w-full" variant={pkg.popular ? "default" : "outline"}>
                      Choose Package
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Packages?</h2>
            <p className="text-xl text-gray-600">All packages include these benefits</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Guaranteed Returns</h3>
              <p className="text-gray-600">
                All packages come with guaranteed minimum returns as specified in your investment terms.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Withdrawals</h3>
              <p className="text-gray-600">
                Withdraw your profits at any time through our easy mobile money integration system.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Get round-the-clock support for all your investment questions and concerns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Investment Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Create your account today and choose the package that's right for you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-blue-600">
                Learn How It Works
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InvestmentPackages;

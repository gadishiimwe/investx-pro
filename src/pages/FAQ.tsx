
import React from 'react';
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TrendingUp, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const faqs = [
    {
      question: "What is InvestX and how does it work?",
      answer: "InvestX is a secure investment platform that allows you to invest your money and earn competitive returns. You start by registering and activating your account with 5,000 RWF, then choose from our various investment packages to grow your wealth."
    },
    {
      question: "How much do I need to start investing?",
      answer: "You need a minimum of 5,000 RWF to activate your account, plus the amount for your chosen investment package. Our smallest investment package starts at 10,000 RWF."
    },
    {
      question: "How are the returns calculated?",
      answer: "Returns are calculated based on the package you choose and are guaranteed for the investment period. For example, our Starter Package offers 15% returns over 30 days, meaning you'll receive 11,500 RWF total on a 10,000 RWF investment."
    },
    {
      question: "How do I withdraw my money?",
      answer: "You can withdraw your profits anytime through our platform. Simply request a withdrawal, and we'll process it via MTN Mobile Money to your registered phone number within 24 hours."
    },
    {
      question: "Is my money safe with InvestX?",
      answer: "Yes, your money is completely secure. We use bank-level security measures, encryption, and have a proven track record of successful investments and withdrawals for thousands of users."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We currently accept MTN Mobile Money for both deposits and withdrawals. This makes it convenient for all users in Rwanda to participate in our investment platform."
    },
    {
      question: "How long does it take to activate my account?",
      answer: "Account activation is usually completed within 2-4 hours after we receive your payment confirmation via WhatsApp. Our admin team works quickly to get you started."
    },
    {
      question: "Can I invest in multiple packages at once?",
      answer: "Yes, you can invest in multiple packages simultaneously to diversify your portfolio and maximize your returns based on your financial capacity."
    },
    {
      question: "What happens if I refer someone?",
      answer: "You earn referral bonuses when people you refer successfully activate their accounts and start investing. The bonus amount depends on their investment level."
    },
    {
      question: "How do I track my investments?",
      answer: "Once logged in to your dashboard, you can track all your active investments, returns, withdrawal history, and referral earnings in real-time."
    },
    {
      question: "What if I have technical issues?",
      answer: "Our support team is available 24/7 to help with any technical issues. You can reach us via WhatsApp at +250 736 563 999 or through the support section in your dashboard."
    },
    {
      question: "Are there any hidden fees?",
      answer: "No, there are no hidden fees. The only cost is the one-time activation fee of 5,000 RWF and your investment amount. All returns are as advertised with no deductions."
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
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Get answers to common questions about InvestX and start your investment journey with confidence.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-4">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-blue-50 rounded-lg p-8">
            <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
            <p className="text-gray-600 mb-6">
              Our support team is ready to help you with any additional questions you might have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/250736563999?text=Hello%2C%20I%20have%20a%20question%20about%20InvestX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Contact via WhatsApp
              </a>
              <Link to="/register">
                <Button variant="outline" size="lg" className="px-6 py-3">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;

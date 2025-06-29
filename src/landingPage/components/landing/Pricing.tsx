import React from 'react';
import { Check, Crown, Heart } from 'lucide-react';
import Button from '../common/Button';

const Pricing: React.FC = () => {
  const plans = [
    {
      id: '1',
      name: 'Essential',
      price: 29,
      duration: 'month',
      description: 'Perfect for intimate weddings',
      features: [
        'Up to 50 guests',
        'Basic RSVP management',
        'Wedding website',
        'Photo gallery',
        'Email support'
      ],
      popular: false
    },
    {
      id: '2',
      name: 'Premium',
      price: 59,
      duration: 'month',
      description: 'Most popular for medium weddings',
      features: [
        'Up to 200 guests',
        'Advanced RSVP system',
        'Custom wedding website',
        'Unlimited photo storage',
        'Gift registry integration',
        'Timeline management',
        'Priority support'
      ],
      popular: true
    },
    {
      id: '3',
      name: 'Luxury',
      price: 99,
      duration: 'month',
      description: 'For grand celebrations',
      features: [
        'Unlimited guests',
        'Full-featured platform',
        'Premium website themes',
        'Professional photo tools',
        'Multi-event management',
        'Vendor coordination',
        'White-glove support',
        'Custom branding'
      ],
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-[#1E2A49] mb-6">
            Choose Your Perfect Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start with our free trial, then choose the plan that fits your wedding size and needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                plan.popular ? 'ring-2 ring-[#F8CACA] scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#F8CACA] text-[#1E2A49] px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Crown className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="p-8">
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    plan.popular ? 'bg-[#F8CACA]' : 'bg-gray-100'
                  }`}>
                    <Heart className={`w-8 h-8 ${
                      plan.popular ? 'text-[#1E2A49]' : 'text-gray-400'
                    }`} />
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-[#1E2A49] mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-[#1E2A49]">${plan.price}</span>
                    <span className="text-gray-500">/{plan.duration}</span>
                  </div>
                </div>
                
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="bg-green-100 rounded-full p-1 mr-3">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  fullWidth
                  variant={plan.popular ? 'primary' : 'outline'}
                  size="large"
                  className={plan.popular ? 'bg-[#1E2A49] hover:bg-[#2a3c69]' : ''}
                >
                  Start Free Trial
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">All plans include a 30-day free trial</p>
          <p className="text-sm text-gray-500">No setup fees • Cancel anytime • 24/7 support</p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
import React from 'react';
import { Check, Smartphone, Globe, Shield, Headphones, Zap } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Mobile Optimized',
      description: 'Access your wedding dashboard anywhere, anytime from any device'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Global Access',
      description: 'Share with guests worldwide with multi-language support'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure & Private',
      description: 'Your data is protected with enterprise-grade security'
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: '24/7 Support',
      description: 'Get help whenever you need it with our dedicated support team'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Real-time Updates',
      description: 'Instant notifications and updates for all wedding activities'
    },
    {
      icon: <Check className="w-6 h-6" />,
      title: 'Easy Setup',
      description: 'Get started in minutes with our intuitive setup process'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1E2A49] mb-6">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We've designed every feature with couples in mind, making wedding planning stress-free and enjoyable.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-[#F8CACA] text-[#1E2A49] rounded-lg p-2 mr-4 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1E2A49] mb-1">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-[#1E2A49] to-[#2a3c69] rounded-2xl p-8 text-white">
              <img 
                src="https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" 
                alt="Wedding Planning Dashboard" 
                className="w-full rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-[#F8CACA] text-[#1E2A49] rounded-full p-4 shadow-lg">
                <Check className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
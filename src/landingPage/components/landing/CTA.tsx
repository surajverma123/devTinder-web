import React from 'react';
import { ArrowRight, Heart, Users, Calendar } from 'lucide-react';
import Button from '../common/Button';

const CTA: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#1E2A49] to-[#2a3c69] text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="bg-[#F8CACA]/20 rounded-full p-4">
              <Heart className="w-12 h-12 text-[#F8CACA]" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-serif mb-6">
            Ready to Plan Your Dream Wedding?
          </h2>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of couples who have made their wedding planning stress-free and memorable
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="large" 
              className="bg-[#F8CACA] text-[#1E2A49] hover:bg-[#f5bebe] px-8 py-4 text-lg font-semibold"
              icon={<ArrowRight size={20} />}
              iconPosition="right"
            >
              Start Your Free Trial
            </Button>
            
            <Button 
              variant="outline" 
              size="large"
              className="border-white text-white hover:bg-white hover:text-[#1E2A49] px-8 py-4 text-lg"
            >
              Schedule a Demo
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center justify-center">
              <Users className="w-6 h-6 text-[#F8CACA] mr-3" />
              <div className="text-left">
                <div className="font-semibold">50,000+</div>
                <div className="text-white/80 text-sm">Happy Couples</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <Calendar className="w-6 h-6 text-[#F8CACA] mr-3" />
              <div className="text-left">
                <div className="font-semibold">1M+</div>
                <div className="text-white/80 text-sm">Events Planned</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <Heart className="w-6 h-6 text-[#F8CACA] mr-3" />
              <div className="text-left">
                <div className="font-semibold">99%</div>
                <div className="text-white/80 text-sm">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
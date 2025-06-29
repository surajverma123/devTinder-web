import React from 'react';
import { Heart, Play, ArrowRight } from 'lucide-react';
import Button from '../common/Button';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1" 
          alt="Beautiful Wedding" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E2A49]/80 via-[#1E2A49]/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <Heart className="w-12 h-12 text-[#F8CACA]" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
            Your Perfect Wedding
            <span className="block text-[#F8CACA]">Starts Here</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Plan, organize, and celebrate your special day with our comprehensive wedding management platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="large" 
              className="bg-[#F8CACA] text-[#1E2A49] hover:bg-[#f5bebe] px-8 py-4 text-lg font-semibold"
              icon={<ArrowRight size={20} />}
              iconPosition="right"
            >
              Start Planning Today
            </Button>
            
            <Button 
              variant="outline" 
              size="large"
              className="border-white text-white hover:bg-white hover:text-[#1E2A49] px-8 py-4 text-lg"
              icon={<Play size={20} />}
            >
              Watch Demo
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-[#F8CACA] mb-2">50K+</div>
              <div className="text-white/80">Happy Couples</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-[#F8CACA] mb-2">1M+</div>
              <div className="text-white/80">Guests Managed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-[#F8CACA] mb-2">99%</div>
              <div className="text-white/80">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
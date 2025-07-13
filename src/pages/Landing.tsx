import React from 'react';
import LandingHeader from '../components/landing/LandingHeader';
import LandingFooter from '../components/landing/LandingFooter';
import Hero from '../components/landing/Hero';
import Services from '../components/landing/Services';
import Features from '../components/landing/Features';
import Testimonials from '../components/landing/Testimonials';
import Pricing from '../components/landing/Pricing';
import CTA from '../components/landing/CTA';

interface LandingProps {
  onLogin: () => void;
  onSignup: () => void;
}

const Landing: React.FC<LandingProps> = ({ onLogin, onSignup }) => {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader onLogin={onLogin} onSignup={onSignup} />
      
      <main>
        <Hero onLogin={onLogin} onSignup={onSignup} />
        <Services />
        <Features />
        <Testimonials />
        <Pricing onSignup={onSignup} />
        <CTA onSignup={onSignup} />
      </main>
      
      <LandingFooter />
    </div>
  );
};

export default Landing;
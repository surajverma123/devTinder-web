import React from 'react';
import LandingHeader from '../components/landing/LandingHeader';
import LandingFooter from '../components/landing/LandingFooter';
import Hero from '../components/landing/Hero';
import Services from '../components/landing/Services';
import Features from '../components/landing/Features';
import Testimonials from '../components/landing/Testimonials';
import Pricing from '../components/landing/Pricing';
import CTA from '../components/landing/CTA';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />
      
      <main>
        <Hero />
        <Services />
        <Features />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      
      <LandingFooter />
    </div>
  );
};

export default Landing;
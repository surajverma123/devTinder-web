import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const LandingFooter: React.FC = () => {
  return (
    <footer className="bg-[#1E2A49] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <Heart className="text-[#F8CACA] mr-2" size={24} />
              <h2 className="text-2xl font-serif">WeddingPro</h2>
            </div>
            <p className="text-white/80 mb-6">
              Making wedding planning beautiful, simple, and stress-free for couples worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-[#F8CACA] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-[#F8CACA] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-[#F8CACA] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-[#F8CACA] transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <nav className="flex flex-col space-y-2">
              {['Features', 'Pricing', 'Templates', 'Integrations', 'API', 'Mobile App'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className="text-white/80 hover:text-[#F8CACA] transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <nav className="flex flex-col space-y-2">
              {['Help Center', 'Getting Started', 'Contact Us', 'System Status', 'Bug Reports', 'Feature Requests'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-white/80 hover:text-[#F8CACA] transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="flex flex-col space-y-3">
              <a 
                href="mailto:hello@weddingpro.com" 
                className="flex items-center text-white/80 hover:text-[#F8CACA] transition-colors duration-200"
              >
                <Mail size={16} className="mr-2" />
                <span>hello@weddingpro.com</span>
              </a>
              <a 
                href="tel:+1-800-WEDDING" 
                className="flex items-center text-white/80 hover:text-[#F8CACA] transition-colors duration-200"
              >
                <Phone size={16} className="mr-2" />
                <span>1-800-WEDDING</span>
              </a>
              <div className="flex items-start text-white/80">
                <MapPin size={16} className="mr-2 mt-1 flex-shrink-0" />
                <address className="not-italic">
                  123 Wedding Street<br />
                  Love City, LC 12345
                </address>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} WeddingPro. All rights reserved.
            </p>
            <nav className="flex space-x-6 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-white/60 hover:text-[#F8CACA] transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
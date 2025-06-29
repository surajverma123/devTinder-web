import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, LogIn, UserPlus } from 'lucide-react';
import Button from '../common/Button';

const LandingHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Heart className="text-[#F8CACA] mr-2" size={28} />
          <h1 className={`text-2xl font-serif transition-colors duration-300 ${
            isScrolled ? 'text-[#1E2A49]' : 'text-white'
          }`}>
            WeddingPro
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {['Features', 'Services', 'Pricing', 'Testimonials', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className={`font-medium hover:text-[#F8CACA] transition-colors duration-200 ${
                isScrolled ? 'text-[#1E2A49]' : 'text-white'
              }`}
            >
              {item}
            </a>
          ))}
          
          <div className="flex items-center space-x-3 ml-4">
            <Button 
              variant="text" 
              size="small"
              className={isScrolled ? 'text-[#1E2A49] hover:bg-gray-100' : 'text-white hover:bg-white/10'}
              icon={<LogIn size={16} />}
            >
              Login
            </Button>
            <Button 
              variant={isScrolled ? 'primary' : 'secondary'}
              size="small"
              className={isScrolled ? 'bg-[#1E2A49] hover:bg-[#2a3c69]' : 'bg-[#F8CACA] text-[#1E2A49] hover:bg-[#f5bebe]'}
              icon={<UserPlus size={16} />}
            >
              Sign Up
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? (
            <X className={isScrolled ? 'text-[#1E2A49]' : 'text-white'} size={24} />
          ) : (
            <Menu className={isScrolled ? 'text-[#1E2A49]' : 'text-white'} size={24} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md animate-fade-in-down">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {['Features', 'Services', 'Pricing', 'Testimonials', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className="text-[#1E2A49] font-medium py-2 hover:text-[#F8CACA] transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  size="small"
                  fullWidth
                  icon={<LogIn size={16} />}
                >
                  Login
                </Button>
                <Button 
                  variant="primary"
                  size="small"
                  fullWidth
                  className="bg-[#1E2A49] hover:bg-[#2a3c69]"
                  icon={<UserPlus size={16} />}
                >
                  Sign Up Free
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default LandingHeader;
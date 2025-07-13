import React, { useState, useEffect } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';

const Header: React.FC = () => {
  const { weddingDetails } = useWedding();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for header transparency
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
          <Heart className="text-[#F8CACA] mr-2" size={24} />
          <h1 className={`text-xl font-serif transition-colors duration-300 ${
            isScrolled ? 'text-[#1E2A49]' : 'text-white'
          }`}>
            {weddingDetails.brideFirstName} & {weddingDetails.groomFirstName}
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {['Dashboard', 'RSVP', 'Photos', 'Registry', 'Timeline', 'Our Story'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className={`font-medium hover:text-[#D4AF37] transition-colors duration-200 ${
                isScrolled ? 'text-[#1E2A49]' : 'text-white'
              }`}
            >
              {item}
            </a>
          ))}
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
              {['Dashboard', 'RSVP', 'Photos', 'Registry', 'Timeline', 'Our Story'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-[#1E2A49] font-medium py-2 hover:text-[#D4AF37] transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
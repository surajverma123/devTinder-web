import React from 'react';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import { formatDate } from '../../utils/date';

const Footer: React.FC = () => {
  const { weddingDetails } = useWedding();

  return (
    <footer className="bg-[#1E2A49] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Wedding Info */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center mb-4">
              <Heart className="text-[#F8CACA] mr-2" size={20} />
              <h2 className="text-xl font-serif">
                {weddingDetails.brideFirstName} & {weddingDetails.groomFirstName}
              </h2>
            </div>
            <p className="text-center md:text-left mb-2">
              {formatDate(weddingDetails.weddingDate)}
            </p>
            <p className="text-center md:text-left">
              {weddingDetails.venueName}
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-lg font-serif mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              {['Dashboard', 'RSVP', 'Photos', 'Registry', 'Timeline', 'Our Story'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="hover:text-[#F8CACA] transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-lg font-serif mb-4">Contact</h3>
            <div className="flex flex-col space-y-2">
              <a 
                href="mailto:contact@emmaandmichael.com" 
                className="flex items-center hover:text-[#F8CACA] transition-colors duration-200"
              >
                <Mail size={16} className="mr-2" />
                <span>contact@emmaandmichael.com</span>
              </a>
              <a 
                href="tel:+1234567890" 
                className="flex items-center hover:text-[#F8CACA] transition-colors duration-200"
              >
                <Phone size={16} className="mr-2" />
                <span>+1 (234) 567-890</span>
              </a>
              <div className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1 flex-shrink-0" />
                <address className="not-italic">
                  {weddingDetails.venueAddress}
                </address>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center text-sm opacity-70">
          <p>© {new Date().getFullYear()} • {weddingDetails.brideFirstName} & {weddingDetails.groomFirstName}'s Wedding</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
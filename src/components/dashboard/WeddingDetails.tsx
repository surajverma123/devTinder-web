import React from 'react';
import { MapPin, Calendar, Clock, Mail } from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import Card from '../common/Card';
import { formatDate, formatTime } from '../../utils/date';

const WeddingDetails: React.FC = () => {
  const { weddingDetails } = useWedding();

  const mapUrl = `https://maps.google.com/?q=${encodeURIComponent(weddingDetails.venueAddress)}`;

  return (
    <Card 
      title="Wedding Information" 
      className="bg-gradient-to-br from-[#F8CACA]/20 to-white"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-serif text-[#1E2A49] mb-4">Ceremony</h3>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <Calendar className="mr-3 text-[#D4AF37] mt-0.5" size={18} />
              <div>
                <p className="font-medium">Date</p>
                <p className="text-gray-600">{formatDate(weddingDetails.weddingDate)}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock className="mr-3 text-[#D4AF37] mt-0.5" size={18} />
              <div>
                <p className="font-medium">Time</p>
                <p className="text-gray-600">{formatTime(weddingDetails.weddingTime)}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin className="mr-3 text-[#D4AF37] mt-0.5" size={18} />
              <div>
                <p className="font-medium">Venue</p>
                <p className="text-gray-600">{weddingDetails.venueName}</p>
                <p className="text-gray-600">{weddingDetails.venueAddress}</p>
                <a 
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1E2A49] hover:text-[#D4AF37] transition-colors duration-200 text-sm inline-flex items-center mt-1"
                >
                  View on Map
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {weddingDetails.receptionVenue && (
          <div>
            <h3 className="text-xl font-serif text-[#1E2A49] mb-4">Reception</h3>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <Calendar className="mr-3 text-[#D4AF37] mt-0.5" size={18} />
                <div>
                  <p className="font-medium">Date</p>
                  <p className="text-gray-600">{formatDate(weddingDetails.weddingDate)}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="mr-3 text-[#D4AF37] mt-0.5" size={18} />
                <div>
                  <p className="font-medium">Time</p>
                  <p className="text-gray-600">{formatTime('18:00')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="mr-3 text-[#D4AF37] mt-0.5" size={18} />
                <div>
                  <p className="font-medium">Venue</p>
                  <p className="text-gray-600">{weddingDetails.receptionVenue}</p>
                  <p className="text-gray-600">{weddingDetails.receptionAddress}</p>
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(weddingDetails.receptionAddress || '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1E2A49] hover:text-[#D4AF37] transition-colors duration-200 text-sm inline-flex items-center mt-1"
                  >
                    View on Map
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-6 p-4 bg-[#1E2A49]/5 rounded-lg">
        <div className="flex items-start">
          <Mail className="mr-3 text-[#D4AF37] mt-0.5" size={18} />
          <div>
            <p className="font-medium">RSVP Deadline</p>
            <p className="text-gray-600">Please respond by {formatDate(weddingDetails.rsvpDeadline)}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeddingDetails;
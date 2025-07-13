import React from 'react';
import useCountdown from '../../hooks/useCountdown';
import { Clock, Calendar, MapPin } from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import { formatDate, formatTime } from '../../utils/date';
import Card from '../common/Card';

const CountdownTimer: React.FC = () => {
  const { weddingDetails } = useWedding();
  const { days, hours, minutes, seconds, isExpired } = useCountdown(weddingDetails.weddingDate);

  const timeBlocks = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds }
  ];

  return (
    <Card className="bg-gradient-to-r from-[#1E2A49] to-[#2a3c69] text-white">
      <div className="text-center">
        <h2 className="text-2xl font-serif mb-6">
          {isExpired 
            ? 'Happily Married!' 
            : 'Countdown to Our Big Day'}
        </h2>
        
        {isExpired ? (
          <div className="mb-6">
            <p className="text-xl">Thank you for being part of our special day!</p>
            <div className="mt-8 flex justify-center">
              <img 
                src="https://images.pexels.com/photos/1730877/pexels-photo-1730877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Just Married" 
                className="h-48 rounded-lg shadow-lg"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4 mb-6">
            {timeBlocks.map((block) => (
              <div key={block.label} className="flex flex-col items-center">
                <div className="bg-white text-[#1E2A49] rounded-lg w-16 h-16 flex items-center justify-center mb-2 text-2xl font-bold shadow-md">
                  {block.value}
                </div>
                <span className="text-sm">{block.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-center md:justify-start">
            <Calendar className="mr-2 text-[#F8CACA]" size={20} />
            <span>{formatDate(weddingDetails.weddingDate)}</span>
          </div>
          
          <div className="flex items-center justify-center">
            <Clock className="mr-2 text-[#F8CACA]" size={20} />
            <span>{formatTime(weddingDetails.weddingTime)}</span>
          </div>
          
          <div className="flex items-center justify-center md:justify-end">
            <MapPin className="mr-2 text-[#F8CACA]" size={20} />
            <span>{weddingDetails.venueName}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CountdownTimer;
import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import Card from '../common/Card';
import { formatDate, formatTime } from '../../utils/date';

const EventTimeline: React.FC = () => {
  const { events } = useWedding();
  
  // Sort events by date and time
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <Card 
      title="Event Timeline" 
      icon={<Calendar size={20} className="text-[#1E2A49]" />}
    >
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-1 bottom-1 w-0.5 bg-gray-200"></div>
        
        <div className="space-y-8">
          {sortedEvents.map((event, index) => (
            <div key={event.id} className="relative pl-12">
              {/* Timeline dot */}
              <div className={`absolute left-0 top-1.5 w-8 h-8 rounded-full flex items-center justify-center ${
                index === 0 ? 'bg-[#1E2A49] text-white' : 'bg-[#F8CACA] text-[#1E2A49]'
              }`}>
                {index + 1}
              </div>
              
              <div className={`bg-white rounded-lg p-4 border ${
                index === 0 ? 'border-[#1E2A49]' : 'border-gray-200'
              }`}>
                <h3 className="text-lg font-medium text-[#1E2A49]">{event.title}</h3>
                <p className="text-gray-600 mt-1">{event.description}</p>
                
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2 text-[#1E2A49]" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2 text-[#1E2A49]" />
                    <span>{formatTime(event.time)}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-2 text-[#1E2A49]" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default EventTimeline;
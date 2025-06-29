import React from 'react';
import { PieChart, Check, X, Clock } from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import Card from '../common/Card';

const RSVPStats: React.FC = () => {
  const { guests } = useWedding();
  
  const confirmedCount = guests.filter(guest => guest.rsvpStatus === 'confirmed').length;
  const declinedCount = guests.filter(guest => guest.rsvpStatus === 'declined').length;
  const pendingCount = guests.filter(guest => guest.rsvpStatus === 'pending').length;
  
  const totalGuests = guests.length;
  const confirmedPercentage = totalGuests ? Math.round((confirmedCount / totalGuests) * 100) : 0;
  const declinedPercentage = totalGuests ? Math.round((declinedCount / totalGuests) * 100) : 0;
  const pendingPercentage = totalGuests ? Math.round((pendingCount / totalGuests) * 100) : 0;

  const statusItems = [
    { 
      label: 'Confirmed', 
      count: confirmedCount, 
      percentage: confirmedPercentage,
      color: 'bg-green-500',
      icon: <Check className="text-green-500" size={18} />
    },
    { 
      label: 'Declined', 
      count: declinedCount, 
      percentage: declinedPercentage,
      color: 'bg-red-500',
      icon: <X className="text-red-500" size={18} />
    },
    { 
      label: 'Pending', 
      count: pendingCount, 
      percentage: pendingPercentage,
      color: 'bg-yellow-500',
      icon: <Clock className="text-yellow-500" size={18} />
    }
  ];

  return (
    <Card 
      title="RSVP Status" 
      icon={<PieChart size={20} className="text-[#1E2A49]" />}
      className="h-full"
    >
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-1">Total Guests</div>
          <div className="text-2xl font-semibold">{totalGuests}</div>
        </div>
        
        <div className="space-y-4 flex-grow">
          {statusItems.map((item) => (
            <div key={item.label} className="flex items-center">
              <div className="w-8">{item.icon}</div>
              <div className="flex-grow">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-sm text-gray-500">{item.count} ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${item.color} h-2 rounded-full`} 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default RSVPStats;
import React from 'react';
import { Gift, ExternalLink, Check } from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import Card from '../common/Card';
import Button from '../common/Button';

const GiftRegistry: React.FC = () => {
  const { giftRegistry } = useWedding();

  return (
    <Card 
      title="Gift Registry" 
      icon={<Gift size={20} className="text-[#1E2A49]" />}
      footer={
        <div className="text-center">
          <Button variant="secondary" size="small" icon={<ExternalLink size={16} />}>
            View Full Registry
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {giftRegistry.map((item) => (
          <div 
            key={item.id} 
            className={`border rounded-lg overflow-hidden flex flex-col ${
              item.purchased ? 'opacity-70' : ''
            }`}
          >
            <div className="relative h-40">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
              {item.purchased && (
                <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center">
                    <Check size={16} className="mr-1" />
                    Purchased
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-3 flex-grow">
              <h4 className="font-medium text-[#1E2A49]">{item.name}</h4>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
              <p className="text-[#D4AF37] font-medium mt-2">${item.price.toFixed(2)}</p>
            </div>
            
            <div className="p-3 pt-0">
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`text-sm font-medium flex items-center ${
                  item.purchased 
                    ? 'text-gray-500 cursor-not-allowed' 
                    : 'text-[#1E2A49] hover:text-[#D4AF37] transition-colors duration-200'
                }`}
              >
                <ExternalLink size={14} className="mr-1" />
                {item.purchased ? 'Already Purchased' : 'View Item'}
              </a>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default GiftRegistry;
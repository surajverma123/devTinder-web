import React from 'react';
import { Image, Heart } from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import Card from '../common/Card';
import { formatDate } from '../../utils/date';

const PhotoGallery: React.FC = () => {
  const { photos } = useWedding();

  return (
    <Card 
      title="Our Photos" 
      icon={<Image size={20} className="text-[#1E2A49]" />}
      footer={
        <div className="text-center">
          <button className="text-[#1E2A49] hover:text-[#D4AF37] transition-colors duration-200 font-medium">
            View All Photos
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div 
            key={photo.id} 
            className="group relative overflow-hidden rounded-lg transition-transform duration-300 hover:-translate-y-1"
          >
            <img 
              src={photo.url} 
              alt={photo.caption} 
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E2A49]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
              <div className="text-white">
                <h4 className="font-medium">{photo.caption}</h4>
                <p className="text-sm opacity-80">{formatDate(photo.date)}</p>
              </div>
            </div>
            <button className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#F8CACA]">
              <Heart size={16} className="text-[#1E2A49]" />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PhotoGallery;
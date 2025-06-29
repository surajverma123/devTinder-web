import React from 'react';
import { Users, Calendar, Gift, Camera, MapPin, Heart, Clock, Star } from 'lucide-react';
import Card from '../common/Card';

const Services: React.FC = () => {
  const services = [
    {
      id: '1',
      title: 'Guest Management',
      description: 'Effortlessly manage your guest list, track RSVPs, and handle dietary requirements',
      icon: <Users className="w-8 h-8 text-[#1E2A49]" />,
      features: ['Digital RSVP System', 'Guest List Organization', 'Dietary Tracking', 'Plus-One Management']
    },
    {
      id: '2',
      title: 'Event Planning',
      description: 'Create detailed timelines and coordinate all your wedding events seamlessly',
      icon: <Calendar className="w-8 h-8 text-[#1E2A49]" />,
      features: ['Timeline Creation', 'Vendor Coordination', 'Schedule Management', 'Reminder System']
    },
    {
      id: '3',
      title: 'Gift Registry',
      description: 'Set up and manage your wedding registry with real-time tracking',
      icon: <Gift className="w-8 h-8 text-[#1E2A49]" />,
      features: ['Multi-Store Registry', 'Gift Tracking', 'Thank You Management', 'Duplicate Prevention']
    },
    {
      id: '4',
      title: 'Photo Sharing',
      description: 'Create beautiful galleries and collect memories from your guests',
      icon: <Camera className="w-8 h-8 text-[#1E2A49]" />,
      features: ['Guest Photo Upload', 'Professional Galleries', 'Memory Timeline', 'Download Options']
    },
    {
      id: '5',
      title: 'Venue Management',
      description: 'Organize venue details, directions, and accommodation information',
      icon: <MapPin className="w-8 h-8 text-[#1E2A49]" />,
      features: ['Venue Information', 'Interactive Maps', 'Accommodation Lists', 'Transportation']
    },
    {
      id: '6',
      title: 'Wedding Website',
      description: 'Create a personalized wedding website with all your important information',
      icon: <Heart className="w-8 h-8 text-[#1E2A49]" />,
      features: ['Custom Design', 'Love Story', 'Event Details', 'Mobile Responsive']
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-[#1E2A49] mb-6">
            Everything You Need for Your Perfect Day
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools and features you need to plan, organize, and celebrate your wedding
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card 
              key={service.id}
              className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white"
              hover={true}
            >
              <div className="text-center">
                <div className="bg-[#F8CACA]/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#1E2A49] mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <div className="space-y-2">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-500">
                      <Star className="w-4 h-4 text-[#D4AF37] mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-[#1E2A49] text-white px-6 py-3 rounded-full">
            <Clock className="w-5 h-5 mr-2" />
            <span className="font-medium">Free 30-day trial • No credit card required</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
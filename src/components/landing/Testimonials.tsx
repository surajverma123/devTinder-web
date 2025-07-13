import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: '1',
      name: 'Sarah & James',
      location: 'New York, NY',
      image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      review: 'This platform made our wedding planning so much easier! The guest management system was a lifesaver, and our families loved the photo sharing feature.',
      rating: 5
    },
    {
      id: '2',
      name: 'Emily & Michael',
      location: 'Los Angeles, CA',
      image: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      review: 'We couldn\'t have organized our destination wedding without this tool. The timeline feature kept everyone on track, and the mobile app was perfect for our guests.',
      rating: 5
    },
    {
      id: '3',
      name: 'Jessica & David',
      location: 'Chicago, IL',
      image: 'https://images.pexels.com/photos/1415131/pexels-photo-1415131.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      review: 'The gift registry integration was seamless, and we loved how easy it was to track RSVPs. Our wedding website looked absolutely beautiful!',
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#F8CACA]/10 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-[#1E2A49] mb-6">
            Love Stories from Happy Couples
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what couples are saying about their experience with our wedding planning platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
            >
              <div className="absolute -top-4 left-8">
                <div className="bg-[#1E2A49] text-[#F8CACA] rounded-full p-3">
                  <Quote className="w-6 h-6" />
                </div>
              </div>
              
              <div className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#D4AF37] fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-600 mb-6 italic">"{testimonial.review}"</p>
                
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-[#1E2A49]">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 text-[#1E2A49]">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-[#D4AF37] fill-current" />
              ))}
            </div>
            <span className="font-semibold">4.9/5 from 2,500+ couples</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
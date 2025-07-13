import React from 'react';
import CountdownTimer from '../components/dashboard/CountdownTimer';
import RSVPStats from '../components/dashboard/RSVPStats';
import GuestList from '../components/dashboard/GuestList';
import PhotoGallery from '../components/dashboard/PhotoGallery';
import GiftRegistry from '../components/dashboard/GiftRegistry';
import EventTimeline from '../components/dashboard/EventTimeline';
import WeddingDetails from '../components/dashboard/WeddingDetails';

const Dashboard: React.FC = () => {
  return (
    <div className="py-6 space-y-6">
      <section id="countdown">
        <CountdownTimer />
      </section>
      
      <section id="stats-and-guests" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GuestList />
        </div>
        <div>
          <RSVPStats />
        </div>
      </section>
      
      <section id="wedding-details">
        <WeddingDetails />
      </section>
      
      <section id="registry-and-photos" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <GiftRegistry />
        </div>
        <div>
          <PhotoGallery />
        </div>
      </section>
      
      <section id="timeline">
        <EventTimeline />
      </section>
    </div>
  );
};

export default Dashboard;
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Guest, GiftRegistryItem, Event, Photo, WeddingDetails } from '../types';

// Sample data
const sampleWeddingDetails: WeddingDetails = {
  brideFirstName: 'Emma',
  brideLastName: 'Johnson',
  groomFirstName: 'Michael',
  groomLastName: 'Thompson',
  weddingDate: '2025-08-15',
  weddingTime: '16:00',
  venueName: 'Grand Pavilion Gardens',
  venueAddress: '123 Garden View, Beverly Hills, CA 90210',
  receptionVenue: 'Grand Pavilion Hall',
  receptionAddress: '123 Garden View, Beverly Hills, CA 90210',
  rsvpDeadline: '2025-07-15'
};

const sampleGuests: Guest[] = [
  {
    id: '1',
    name: 'Sarah Parker',
    email: 'sarah@example.com',
    phone: '555-123-4567',
    rsvpStatus: 'confirmed',
    plusOne: true,
    dietaryRestrictions: 'Vegetarian'
  },
  {
    id: '2',
    name: 'James Wilson',
    email: 'james@example.com',
    rsvpStatus: 'pending',
    plusOne: false
  },
  {
    id: '3',
    name: 'Linda Brown',
    email: 'linda@example.com',
    phone: '555-987-6543',
    rsvpStatus: 'declined',
    plusOne: false,
    notes: 'Sending a gift'
  }
];

const sampleGiftRegistry: GiftRegistryItem[] = [
  {
    id: '1',
    name: 'Kitchen Aid Mixer',
    description: 'Professional 5 Plus Series 5 Quart Bowl-Lift Stand Mixer',
    price: 349.99,
    image: 'https://images.pexels.com/photos/1294230/pexels-photo-1294230.jpeg?auto=compress&cs=tinysrgb&w=600',
    link: 'https://example.com/mixer',
    purchased: false
  },
  {
    id: '2',
    name: 'Dyson Vacuum',
    description: 'V11 Torque Drive Cordless Vacuum Cleaner',
    price: 599.99,
    image: 'https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg?auto=compress&cs=tinysrgb&w=600',
    link: 'https://example.com/vacuum',
    purchased: true
  },
  {
    id: '3',
    name: 'Honeymoon Fund Contribution',
    description: 'Help us create memories on our dream honeymoon',
    price: 50,
    image: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=600',
    link: 'https://example.com/honeymoon',
    purchased: false
  }
];

const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Welcome Dinner',
    description: 'Join us for a casual dinner to kick off the wedding weekend',
    date: '2025-08-14',
    time: '19:00',
    location: 'Garden Restaurant'
  },
  {
    id: '2',
    title: 'Wedding Ceremony',
    description: 'The wedding ceremony will be held in the garden pavilion',
    date: '2025-08-15',
    time: '16:00',
    location: 'Grand Pavilion Gardens'
  },
  {
    id: '3',
    title: 'Reception',
    description: 'Dinner, dancing, and celebration',
    date: '2025-08-15',
    time: '18:00',
    location: 'Grand Pavilion Hall'
  },
  {
    id: '4',
    title: 'Farewell Brunch',
    description: 'A casual brunch to say goodbye',
    date: '2025-08-16',
    time: '10:00',
    location: 'Garden Restaurant'
  }
];

const samplePhotos: Photo[] = [
  {
    id: '1',
    url: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=600',
    caption: 'Our Engagement',
    date: '2024-05-10'
  },
  {
    id: '2',
    url: 'https://images.pexels.com/photos/1415131/pexels-photo-1415131.jpeg?auto=compress&cs=tinysrgb&w=600',
    caption: 'First Date Anniversary',
    date: '2023-11-15'
  },
  {
    id: '3',
    url: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600',
    caption: 'Weekend Getaway',
    date: '2024-02-20'
  }
];

interface WeddingContextType {
  weddingDetails: WeddingDetails;
  guests: Guest[];
  giftRegistry: GiftRegistryItem[];
  events: Event[];
  photos: Photo[];
  updateWeddingDetails: (details: Partial<WeddingDetails>) => void;
  addGuest: (guest: Omit<Guest, 'id'>) => void;
  updateGuest: (id: string, guest: Partial<Guest>) => void;
  removeGuest: (id: string) => void;
  addGiftItem: (item: Omit<GiftRegistryItem, 'id'>) => void;
  updateGiftItem: (id: string, item: Partial<GiftRegistryItem>) => void;
  removeGiftItem: (id: string) => void;
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  removeEvent: (id: string) => void;
  addPhoto: (photo: Omit<Photo, 'id'>) => void;
  removePhoto: (id: string) => void;
}

const WeddingContext = createContext<WeddingContextType | undefined>(undefined);

export const WeddingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [weddingDetails, setWeddingDetails] = useState<WeddingDetails>(sampleWeddingDetails);
  const [guests, setGuests] = useState<Guest[]>(sampleGuests);
  const [giftRegistry, setGiftRegistry] = useState<GiftRegistryItem[]>(sampleGiftRegistry);
  const [events, setEvents] = useState<Event[]>(sampleEvents);
  const [photos, setPhotos] = useState<Photo[]>(samplePhotos);

  const updateWeddingDetails = (details: Partial<WeddingDetails>) => {
    setWeddingDetails(prev => ({ ...prev, ...details }));
  };

  const addGuest = (guest: Omit<Guest, 'id'>) => {
    const newGuest = { ...guest, id: Date.now().toString() };
    setGuests(prev => [...prev, newGuest as Guest]);
  };

  const updateGuest = (id: string, guestUpdate: Partial<Guest>) => {
    setGuests(prev => 
      prev.map(guest => guest.id === id ? { ...guest, ...guestUpdate } : guest)
    );
  };

  const removeGuest = (id: string) => {
    setGuests(prev => prev.filter(guest => guest.id !== id));
  };

  const addGiftItem = (item: Omit<GiftRegistryItem, 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() };
    setGiftRegistry(prev => [...prev, newItem as GiftRegistryItem]);
  };

  const updateGiftItem = (id: string, itemUpdate: Partial<GiftRegistryItem>) => {
    setGiftRegistry(prev => 
      prev.map(item => item.id === id ? { ...item, ...itemUpdate } : item)
    );
  };

  const removeGiftItem = (id: string) => {
    setGiftRegistry(prev => prev.filter(item => item.id !== id));
  };

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = { ...event, id: Date.now().toString() };
    setEvents(prev => [...prev, newEvent as Event]);
  };

  const updateEvent = (id: string, eventUpdate: Partial<Event>) => {
    setEvents(prev => 
      prev.map(event => event.id === id ? { ...event, ...eventUpdate } : event)
    );
  };

  const removeEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  const addPhoto = (photo: Omit<Photo, 'id'>) => {
    const newPhoto = { ...photo, id: Date.now().toString() };
    setPhotos(prev => [...prev, newPhoto as Photo]);
  };

  const removePhoto = (id: string) => {
    setPhotos(prev => prev.filter(photo => photo.id !== id));
  };

  const value = {
    weddingDetails,
    guests,
    giftRegistry,
    events,
    photos,
    updateWeddingDetails,
    addGuest,
    updateGuest,
    removeGuest,
    addGiftItem,
    updateGiftItem,
    removeGiftItem,
    addEvent,
    updateEvent,
    removeEvent,
    addPhoto,
    removePhoto
  };

  return (
    <WeddingContext.Provider value={value}>
      {children}
    </WeddingContext.Provider>
  );
};

export const useWedding = () => {
  const context = useContext(WeddingContext);
  if (context === undefined) {
    throw new Error('useWedding must be used within a WeddingProvider');
  }
  return context;
};
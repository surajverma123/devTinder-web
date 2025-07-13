export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  profession: string;
  location: string;
  bio: string;
  interests: string[];
  profileImage: string;
  isOnline: boolean;
  lastSeen: string;
  matchPercentage?: number;
}

export interface Connection {
  id: string;
  user: User;
  status: 'connected' | 'pending' | 'favorite';
  lastMessage: string;
  lastMessageTime: string;
  matchPercentage: number;
}

export interface DashboardStats {
  profileViews: number;
  profileViewsChange: string;
  activeConnections: number;
  activeConnectionsChange: string;
  messages: number;
  messagesChange: string;
  compatibilityScore: number;
  compatibilityChange: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  isVerified?: boolean;
  profileComplete?: boolean;
}

// Legacy types for wedding functionality (kept for backward compatibility)
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  image: string;
  review: string;
  rating: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  rsvpStatus: 'pending' | 'confirmed' | 'declined';
  plusOne: boolean;
  dietaryRestrictions?: string;
  notes?: string;
}

export interface GiftRegistryItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  link: string;
  purchased: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
}

export interface Photo {
  id: string;
  url: string;
  caption: string;
  date: string;
}

export interface WeddingDetails {
  brideFirstName: string;
  brideLastName: string;
  groomFirstName: string;
  groomLastName: string;
  weddingDate: string;
  weddingTime: string;
  venueName: string;
  venueAddress: string;
  receptionVenue?: string;
  receptionAddress?: string;
  rsvpDeadline: string;
}
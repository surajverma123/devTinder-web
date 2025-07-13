import React, { useState } from 'react';
import DashboardHeader from '../components/layout/DashboardHeader';
import DashboardStats from '../components/dashboard/DashboardStats';
import ConnectionsGrid from '../components/dashboard/ConnectionsGrid';
import ConnectionsList from '../components/dashboard/ConnectionsList';
import { useAuth } from '../context/AuthContext';
import { DashboardStats as StatsType, Connection, User } from '../types';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [showAllConnections, setShowAllConnections] = useState(false);

  // Mock data - in a real app, this would come from an API
  const mockStats: StatsType = {
    profileViews: 127,
    profileViewsChange: '+12% this week',
    activeConnections: 24,
    activeConnectionsChange: '+3 new today',
    messages: 18,
    messagesChange: '-5% this week',
    compatibilityScore: 87,
    compatibilityChange: '+5% increase'
  };

  const mockUsers: User[] = [
    {
      id: '1',
      name: 'David Kim',
      age: 28,
      profession: 'Software Engineer',
      location: '3 miles away',
      bio: 'Looking for someone who shares my passion for adventure and love for dogs.',
      interests: ['Healthcare', 'Cooking'],
      profileImage: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      isOnline: true,
      lastSeen: 'Online now'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      age: 31,
      profession: 'Marketing Director',
      location: '5 miles away',
      bio: 'Passionate about food, good books, and meaningful conversations.',
      interests: ['Dogs', 'Travel'],
      profileImage: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      isOnline: true,
      lastSeen: 'Online now'
    },
    {
      id: '3',
      name: 'Michael Chen',
      age: 33,
      profession: 'Physician',
      location: '8 miles away',
      bio: 'Searching for someone who enjoys cuisine as much as conversation.',
      interests: ['Technology', 'Wine'],
      profileImage: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      isOnline: false,
      lastSeen: '2 hours ago'
    },
    {
      id: '4',
      name: 'Jessica Martinez',
      age: 29,
      profession: 'Graphic Designer',
      location: '4 miles away',
      bio: 'Creative soul looking for someone to share life\'s adventures with.',
      interests: ['Music', 'Tennis'],
      profileImage: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      isOnline: true,
      lastSeen: 'Online now'
    }
  ];

  const mockConnections: Connection[] = mockUsers.map((mockUser, index) => ({
    id: mockUser.id,
    user: mockUser,
    status: index === 3 ? 'favorite' : 'connected',
    lastMessage: index === 0 ? 'Hey, how was your weekend?' : 'Thanks for the connection!',
    lastMessageTime: ['2h ago', '1d ago', '3d ago', '5h ago'][index],
    matchPercentage: [92, 89, 85, 93][index]
  }));

  if (showAllConnections) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ConnectionsList
            connections={mockConnections}
            onBack={() => setShowAllConnections(false)}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Dashboard</h1>
          <p className="text-gray-600">
            Welcome back, {user?.name}! You have <span className="font-semibold text-[#1E2A49]">3 new</span> connection requests.
          </p>
        </div>

        <div className="space-y-8">
          {/* Stats */}
          <DashboardStats stats={mockStats} />

          {/* Connections */}
          <ConnectionsGrid
            connections={mockConnections}
            onViewAll={() => setShowAllConnections(true)}
          />
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
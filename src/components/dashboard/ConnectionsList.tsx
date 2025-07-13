import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, Heart, User, Filter } from 'lucide-react';
import { Connection } from '../../types';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';
import ChatWindow from '../chat/ChatWindow';

interface ConnectionsListProps {
  connections: Connection[];
  onBack: () => void;
}

const ConnectionsList: React.FC<ConnectionsListProps> = ({ connections, onBack }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'all' | 'online' | 'new' | 'favorites'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'match' | 'name'>('recent');
  const [selectedUser, setSelectedUser] = useState<Connection['user'] | null>(null);

  const tabs = [
    { id: 'all', label: 'All Connections', count: connections.length },
    { id: 'online', label: 'Online Now', count: connections.filter(c => c.user.isOnline).length },
    { id: 'new', label: 'New Messages', count: 5 },
    { id: 'favorites', label: 'Favorites', count: connections.filter(c => c.status === 'favorite').length }
  ];

  const filteredConnections = connections.filter(connection => {
    switch (activeTab) {
      case 'online':
        return connection.user.isOnline;
      case 'favorites':
        return connection.status === 'favorite';
      case 'new':
        return connection.lastMessageTime.includes('ago') && !connection.lastMessageTime.includes('d ago');
      default:
        return true;
    }
  });

  const sortedConnections = [...filteredConnections].sort((a, b) => {
    switch (sortBy) {
      case 'match':
        return b.matchPercentage - a.matchPercentage;
      case 'name':
        return a.user.name.localeCompare(b.user.name);
      default:
        return 0; // Keep original order for recent
    }
  });

  const getStatusIndicator = (isOnline: boolean) => (
    <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
  );

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'text-purple-600';
    if (percentage >= 80) return 'text-blue-600';
    return 'text-green-600';
  };

  const handleMessageClick = (connectionUser: Connection['user']) => {
    setSelectedUser(connectionUser);
  };

  const handleCloseChat = () => {
    setSelectedUser(null);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Button
                variant="text"
                size="small"
                onClick={onBack}
                icon={<ArrowLeft size={18} />}
                className="mr-4"
              >
                Back
              </Button>
              <h2 className="text-xl font-semibold text-gray-900">Your Connections</h2>
            </div>
            <p className="text-gray-600">Manage your current connections and explore new potential matches.</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#1E2A49] text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E2A49] focus:border-transparent"
              >
                <option value="recent">Recent Activity</option>
                <option value="match">Match Percentage</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {sortedConnections.map((connection) => (
              <div
                key={connection.id}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
              >
                <div className="relative mr-4">
                  <img
                    src={connection.user.profileImage}
                    alt={connection.user.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1">
                    {getStatusIndicator(connection.user.isOnline)}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900">
                      {connection.user.name}, {connection.user.age}
                      {connection.user.isOnline && (
                        <span className="ml-2 text-xs text-green-600 font-medium">● Online</span>
                      )}
                    </h3>
                    <div className={`text-sm font-semibold ${getMatchColor(connection.matchPercentage)}`}>
                      {connection.matchPercentage}% Match
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-1">
                    {connection.user.profession} • {connection.user.location}
                  </p>

                  <p className="text-sm text-gray-800 mb-2 line-clamp-2">
                    {connection.user.bio}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-2">
                    {connection.user.interests.slice(0, 3).map((interest, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center text-xs text-gray-500">
                    <MessageCircle className="w-3 h-3 mr-1" />
                    Last message: {connection.lastMessageTime}
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <Button
                    size="small"
                    variant="outline"
                    icon={<User size={14} />}
                  >
                    View Profile
                  </Button>
                  <Button
                    size="small"
                    variant="outline"
                    icon={<Heart size={14} />}
                    className="text-pink-600 border-pink-200 hover:bg-pink-50"
                  >
                    Favorite
                  </Button>
                  <Button
                    size="small"
                    className="bg-[#1E2A49] hover:bg-[#2a3c69]"
                    icon={<MessageCircle size={14} />}
                    onClick={() => handleMessageClick(connection.user)}
                  >
                    Message
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Window */}
      {selectedUser && user && (
        <ChatWindow
          user={selectedUser}
          currentUserId={user.id}
          onClose={handleCloseChat}
        />
      )}
    </>
  );
};

export default ConnectionsList;
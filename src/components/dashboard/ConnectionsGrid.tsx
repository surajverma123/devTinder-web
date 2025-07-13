import React, { useState } from 'react';
import { MessageCircle, Heart, User, MoreHorizontal } from 'lucide-react';
import { Connection } from '../../types';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';
import ChatWindow from '../chat/ChatWindow';

interface ConnectionsGridProps {
  connections: Connection[];
  onViewAll: () => void;
}

const ConnectionsGrid: React.FC<ConnectionsGridProps> = ({ connections, onViewAll }) => {
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState<Connection['user'] | null>(null);

  const getStatusIndicator = (isOnline: boolean) => (
    <div className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-white ${
      isOnline ? 'bg-green-500' : 'bg-gray-400'
    }`} />
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Your Connections</h2>
          <Button
            variant="text"
            size="small"
            onClick={onViewAll}
            className="text-[#1E2A49] hover:text-[#F8CACA]"
          >
            View All →
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {connections.slice(0, 4).map((connection) => (
            <div
              key={connection.id}
              className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative mb-4">
                <img
                  src={connection.user.profileImage}
                  alt={connection.user.name}
                  className="w-full h-32 object-cover rounded-lg"
                />
                {getStatusIndicator(connection.user.isOnline)}
                <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${getMatchColor(connection.matchPercentage)} bg-white shadow-sm`}>
                  {connection.matchPercentage}% Match
                </div>
              </div>

              <div className="mb-3">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {connection.user.name}, {connection.user.age}
                </h3>
                <p className="text-sm text-gray-600 mb-1">{connection.user.profession}</p>
                <p className="text-xs text-gray-500">{connection.user.location}</p>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {connection.user.interests.slice(0, 2).map((interest, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    {interest}
                  </span>
                ))}
              </div>

              <div className="text-xs text-gray-500 mb-3 flex items-center">
                <MessageCircle className="w-3 h-3 mr-1" />
                Last message: {connection.lastMessageTime}
              </div>

              <div className="flex space-x-2">
                <Button
                  size="small"
                  variant="outline"
                  className="flex-1 text-xs"
                  icon={<User size={14} />}
                >
                  Profile
                </Button>
                <Button
                  size="small"
                  className="flex-1 text-xs bg-[#1E2A49] hover:bg-[#2a3c69]"
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

export default ConnectionsGrid;
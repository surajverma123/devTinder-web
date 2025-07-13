import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  X, 
  Check, 
  Clock, 
  User, 
  MapPin, 
  Briefcase, 
  GraduationCap,
  Calendar,
  Filter,
  Search,
  MoreVertical,
  Eye,
  MessageCircle,
  Star
} from 'lucide-react';
import { User as UserType } from '../../types';
import Button from '../common/Button';
import Card from '../common/Card';

interface ConnectionRequest {
  id: string;
  user: UserType;
  type: 'sent' | 'received';
  status: 'pending' | 'accepted' | 'declined';
  message?: string;
  timestamp: Date;
  matchPercentage: number;
  isPremium: boolean;
}

interface RequestsPageProps {
  onClose: () => void;
}

const RequestsPage: React.FC<RequestsPageProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'received' | 'sent' | 'accepted' | 'declined'>('received');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'match' | 'premium'>('recent');

  // Mock requests data
  const mockRequests: ConnectionRequest[] = [
    {
      id: '1',
      user: {
        id: '1',
        name: 'Priya Sharma',
        age: 26,
        profession: 'Doctor',
        location: 'Mumbai, Maharashtra',
        bio: 'Passionate about healthcare and helping others. Love traveling and exploring new cultures.',
        interests: ['Healthcare', 'Travel', 'Reading', 'Music'],
        profileImage: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
        isOnline: true,
        lastSeen: 'Online now'
      },
      type: 'received',
      status: 'pending',
      message: 'Hi! I found your profile very interesting. Would love to connect and know more about you.',
      timestamp: new Date(Date.now() - 3600000),
      matchPercentage: 94,
      isPremium: true
    },
    {
      id: '2',
      user: {
        id: '2',
        name: 'Rahul Patel',
        age: 29,
        profession: 'Software Engineer',
        location: 'Bangalore, Karnataka',
        bio: 'Tech enthusiast who loves coding and innovation. Enjoy hiking and photography in free time.',
        interests: ['Technology', 'Photography', 'Hiking', 'Movies'],
        profileImage: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
        isOnline: false,
        lastSeen: '2 hours ago'
      },
      type: 'received',
      status: 'pending',
      message: 'Hello! Your profile caught my attention. I believe we have similar interests and values.',
      timestamp: new Date(Date.now() - 7200000),
      matchPercentage: 89,
      isPremium: false
    },
    {
      id: '3',
      user: {
        id: '3',
        name: 'Anita Gupta',
        age: 27,
        profession: 'Marketing Manager',
        location: 'Delhi, NCR',
        bio: 'Creative professional with a passion for marketing and brand building. Love art and culture.',
        interests: ['Marketing', 'Art', 'Culture', 'Dance'],
        profileImage: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
        isOnline: true,
        lastSeen: 'Online now'
      },
      type: 'sent',
      status: 'pending',
      timestamp: new Date(Date.now() - 10800000),
      matchPercentage: 87,
      isPremium: true
    },
    {
      id: '4',
      user: {
        id: '4',
        name: 'Vikram Singh',
        age: 31,
        profession: 'Business Analyst',
        location: 'Pune, Maharashtra',
        bio: 'Analytical mind with a creative heart. Enjoy solving complex problems and playing cricket.',
        interests: ['Business', 'Cricket', 'Finance', 'Travel'],
        profileImage: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
        isOnline: false,
        lastSeen: '1 day ago'
      },
      type: 'received',
      status: 'accepted',
      message: 'Thank you for accepting my request! Looking forward to getting to know you better.',
      timestamp: new Date(Date.now() - 86400000),
      matchPercentage: 91,
      isPremium: false
    },
    {
      id: '5',
      user: {
        id: '5',
        name: 'Sneha Reddy',
        age: 25,
        profession: 'Teacher',
        location: 'Hyderabad, Telangana',
        bio: 'Dedicated educator who loves shaping young minds. Passionate about literature and classical music.',
        interests: ['Education', 'Literature', 'Music', 'Cooking'],
        profileImage: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
        isOnline: false,
        lastSeen: '3 hours ago'
      },
      type: 'sent',
      status: 'declined',
      timestamp: new Date(Date.now() - 172800000),
      matchPercentage: 82,
      isPremium: false
    }
  ];

  const tabs = [
    { 
      id: 'received', 
      label: 'Received', 
      count: mockRequests.filter(r => r.type === 'received' && r.status === 'pending').length,
      color: 'bg-blue-100 text-blue-800'
    },
    { 
      id: 'sent', 
      label: 'Sent', 
      count: mockRequests.filter(r => r.type === 'sent' && r.status === 'pending').length,
      color: 'bg-purple-100 text-purple-800'
    },
    { 
      id: 'accepted', 
      label: 'Accepted', 
      count: mockRequests.filter(r => r.status === 'accepted').length,
      color: 'bg-green-100 text-green-800'
    },
    { 
      id: 'declined', 
      label: 'Declined', 
      count: mockRequests.filter(r => r.status === 'declined').length,
      color: 'bg-red-100 text-red-800'
    }
  ];

  const filteredRequests = mockRequests.filter(request => {
    const matchesTab = activeTab === 'received' 
      ? request.type === 'received' && request.status === 'pending'
      : activeTab === 'sent'
      ? request.type === 'sent' && request.status === 'pending'
      : request.status === activeTab;
    
    const matchesSearch = request.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          request.user.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          request.user.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    switch (sortBy) {
      case 'match':
        return b.matchPercentage - a.matchPercentage;
      case 'premium':
        return (b.isPremium ? 1 : 0) - (a.isPremium ? 1 : 0);
      default:
        return b.timestamp.getTime() - a.timestamp.getTime();
    }
  });

  const handleAcceptRequest = (requestId: string) => {
    console.log('Accepting request:', requestId);
    // In real app, this would make an API call
  };

  const handleDeclineRequest = (requestId: string) => {
    console.log('Declining request:', requestId);
    // In real app, this would make an API call
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'text-purple-600 bg-purple-100';
    if (percentage >= 80) return 'text-blue-600 bg-blue-100';
    return 'text-green-600 bg-green-100';
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  const renderRequestCard = (request: ConnectionRequest) => (
    <Card key={request.id} className="hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Profile Section */}
        <div className="flex items-start gap-4 flex-1">
          <div className="relative">
            <img
              src={request.user.profileImage}
              alt={request.user.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
            />
            {request.user.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
            )}
            {request.isPremium && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full border-2 border-white flex items-center justify-center">
                <Star className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {request.user.name}, {request.user.age}
              </h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMatchColor(request.matchPercentage)}`}>
                {request.matchPercentage}% Match
              </span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Briefcase className="w-4 h-4 mr-1" />
              <span className="mr-3">{request.user.profession}</span>
              <MapPin className="w-4 h-4 mr-1" />
              <span>{request.user.location}</span>
            </div>
            
            <p className="text-sm text-gray-700 mb-3 line-clamp-2">{request.user.bio}</p>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {request.user.interests.slice(0, 3).map((interest, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {interest}
                </span>
              ))}
            </div>
            
            {request.message && (
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <p className="text-sm text-gray-700 italic">"{request.message}"</p>
              </div>
            )}
            
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="w-3 h-3 mr-1" />
              <span>{formatTimeAgo(request.timestamp)}</span>
              {request.user.isOnline && (
                <span className="ml-3 text-green-600 font-medium">● Online</span>
              )}
            </div>
          </div>
        </div>
        
        {/* Actions Section */}
        <div className="flex flex-col gap-2 lg:w-48">
          {request.status === 'pending' && request.type === 'received' && (
            <>
              <Button
                size="small"
                className="bg-green-600 hover:bg-green-700 text-white"
                icon={<Check size={16} />}
                onClick={() => handleAcceptRequest(request.id)}
                fullWidth
              >
                Accept
              </Button>
              <Button
                size="small"
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
                icon={<X size={16} />}
                onClick={() => handleDeclineRequest(request.id)}
                fullWidth
              >
                Decline
              </Button>
            </>
          )}
          
          {request.status === 'pending' && request.type === 'sent' && (
            <div className="text-center">
              <div className="inline-flex items-center px-3 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                <Clock className="w-4 h-4 mr-1" />
                Pending
              </div>
            </div>
          )}
          
          {request.status === 'accepted' && (
            <Button
              size="small"
              className="bg-[#1E2A49] hover:bg-[#2a3c69]"
              icon={<MessageCircle size={16} />}
              fullWidth
            >
              Message
            </Button>
          )}
          
          <div className="flex gap-2">
            <Button
              size="small"
              variant="outline"
              icon={<Eye size={16} />}
              className="flex-1"
            >
              View Profile
            </Button>
            <Button
              size="small"
              variant="outline"
              icon={<MoreVertical size={16} />}
              className="px-3"
            >
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto">
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Button
                  variant="text"
                  onClick={onClose}
                  icon={<ArrowLeft size={20} />}
                  className="mr-4"
                >
                  Back
                </Button>
                <div className="flex items-center">
                  <Heart className="text-[#F8CACA] mr-2" size={24} />
                  <h1 className="text-xl font-semibold text-gray-900">Connection Requests</h1>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                Manage your connection requests and build meaningful relationships
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {tabs.map((tab) => (
              <Card key={tab.id} className="text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab(tab.id as any)}>
                <div className="flex items-center justify-center mb-2">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${tab.color}`}>
                    {tab.count}
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900">{tab.label}</h3>
                <p className="text-sm text-gray-500">
                  {tab.id === 'received' && 'New requests for you'}
                  {tab.id === 'sent' && 'Awaiting response'}
                  {tab.id === 'accepted' && 'Successful connections'}
                  {tab.id === 'declined' && 'Not matched'}
                </p>
              </Card>
            ))}
          </div>

          {/* Filters and Search */}
          <Card className="mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Tabs */}
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

              {/* Search and Sort */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search requests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E2A49] focus:border-transparent w-64"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Filter className="text-gray-400" size={18} />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E2A49] focus:border-transparent"
                  >
                    <option value="recent">Recent First</option>
                    <option value="match">Highest Match</option>
                    <option value="premium">Premium First</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>

          {/* Requests List */}
          <div className="space-y-4">
            {sortedRequests.length > 0 ? (
              sortedRequests.map(renderRequestCard)
            ) : (
              <Card className="text-center py-12">
                <div className="flex flex-col items-center">
                  <div className="bg-gray-100 rounded-full p-6 mb-4">
                    <Heart className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {activeTab === 'received' && 'No new requests'}
                    {activeTab === 'sent' && 'No pending requests'}
                    {activeTab === 'accepted' && 'No accepted connections'}
                    {activeTab === 'declined' && 'No declined requests'}
                  </h3>
                  <p className="text-gray-600 max-w-md">
                    {activeTab === 'received' && 'When someone sends you a connection request, it will appear here.'}
                    {activeTab === 'sent' && 'Requests you\'ve sent will appear here while awaiting response.'}
                    {activeTab === 'accepted' && 'Your successful connections will be listed here.'}
                    {activeTab === 'declined' && 'Declined requests will be shown here for your reference.'}
                  </p>
                </div>
              </Card>
            )}
          </div>

          {/* Tips Section */}
          <Card className="mt-8 bg-gradient-to-r from-[#F8CACA]/10 to-[#1E2A49]/5">
            <div className="flex items-start gap-4">
              <div className="bg-[#1E2A49] rounded-full p-3">
                <Heart className="w-6 h-6 text-[#F8CACA]" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Tips for Better Connections</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Complete your profile with recent photos and detailed information</li>
                  <li>• Send personalized messages when connecting with someone</li>
                  <li>• Be genuine and honest in your communications</li>
                  <li>• Respond to requests promptly to show interest</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RequestsPage;
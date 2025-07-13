import React, { useState } from 'react';
import { Bell, Search, Settings, LogOut, User, Heart, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';
import ProfilePage from '../profile/ProfilePage';
import RequestsPage from '../requests/RequestsPage';

const DashboardHeader: React.FC = () => {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const [notifications] = useState(3); // Mock notification count

  const handleProfileClick = () => {
    setShowProfile(true);
    setShowProfileMenu(false);
  };

  const handleRequestsClick = () => {
    setShowRequests(true);
    setShowProfileMenu(false);
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Heart className="text-[#F8CACA] mr-2" size={24} />
              <h1 className="text-xl font-serif text-[#1E2A49]">WeddingPro</h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search connections, messages..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E2A49] focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Requests Button */}
              <button 
                onClick={handleRequestsClick}
                className="relative p-2 text-gray-600 hover:text-[#1E2A49] transition-colors"
              >
                <Users size={20} />
                <span className="absolute -top-1 -right-1 bg-[#F8CACA] text-[#1E2A49] text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  5
                </span>
              </button>

              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-[#1E2A49] transition-colors">
                <Bell size={20} />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>

              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={user?.profileImage || 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1'}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="text-left hidden sm:block">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">View Profile</p>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <button
                      onClick={handleProfileClick}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <User className="mr-3" size={16} />
                      My Profile
                    </button>
                    <button
                      onClick={handleRequestsClick}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Users className="mr-3" size={16} />
                      Requests
                      <span className="ml-auto bg-[#F8CACA] text-[#1E2A49] text-xs rounded-full px-2 py-0.5">
                        5
                      </span>
                    </button>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Settings className="mr-3" size={16} />
                      Settings
                    </a>
                    <hr className="my-1" />
                    <button
                      onClick={logout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="mr-3" size={16} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Page Modal */}
      {showProfile && (
        <ProfilePage onClose={() => setShowProfile(false)} />
      )}

      {/* Requests Page Modal */}
      {showRequests && (
        <RequestsPage onClose={() => setShowRequests(false)} />
      )}
    </>
  );
};

export default DashboardHeader;
import React from 'react';
import { Eye, Users, MessageCircle, Heart, TrendingUp, TrendingDown } from 'lucide-react';
import { DashboardStats as StatsType } from '../../types';
import Card from '../common/Card';

interface DashboardStatsProps {
  stats: StatsType;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  const statItems = [
    {
      title: 'Profile Views',
      value: stats.profileViews,
      change: stats.profileViewsChange,
      icon: <Eye className="w-6 h-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Active Connections',
      value: stats.activeConnections,
      change: stats.activeConnectionsChange,
      icon: <Users className="w-6 h-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Messages',
      value: stats.messages,
      change: stats.messagesChange,
      icon: <MessageCircle className="w-6 h-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Compatibility Score',
      value: `${stats.compatibilityScore}%`,
      change: stats.compatibilityChange,
      icon: <Heart className="w-6 h-6" />,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100'
    }
  ];

  const getChangeIcon = (change: string) => {
    const isPositive = change.startsWith('+');
    return isPositive ? (
      <TrendingUp className="w-4 h-4 text-green-500" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-500" />
    );
  };

  const getChangeColor = (change: string) => {
    const isPositive = change.startsWith('+');
    return isPositive ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((item, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <div className={`${item.bgColor} ${item.color} rounded-lg p-2 mr-3`}>
                  {item.icon}
                </div>
                <h3 className="text-sm font-medium text-gray-600">{item.title}</h3>
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-gray-900 mr-2">{item.value}</span>
                <div className={`flex items-center ${getChangeColor(item.change)} text-sm`}>
                  {getChangeIcon(item.change)}
                  <span className="ml-1">{item.change}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
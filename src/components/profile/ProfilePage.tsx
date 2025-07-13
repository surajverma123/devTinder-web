import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Edit, 
  Camera, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Heart, 
  Star,
  Phone,
  Mail,
  Calendar,
  Users,
  Award,
  Music,
  Book,
  Coffee,
  Plane,
  Settings,
  Shield,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';
import Card from '../common/Card';

interface ProfilePageProps {
  onClose: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onClose }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'photos' | 'preferences' | 'privacy'>('overview');
  const [isEditing, setIsEditing] = useState(false);

  // Mock profile data - in real app, this would come from API
  const profileData = {
    ...user,
    age: 28,
    height: "5'6\"",
    profession: 'Software Engineer',
    company: 'Tech Solutions Inc.',
    education: 'Masters in Computer Science',
    university: 'Stanford University',
    location: 'San Francisco, CA',
    hometown: 'Los Angeles, CA',
    religion: 'Christian',
    caste: 'Open to all',
    motherTongue: 'English',
    maritalStatus: 'Never Married',
    bio: 'I\'m a passionate software engineer who loves creating innovative solutions. In my free time, I enjoy hiking, photography, and exploring new cuisines. Looking for someone who shares similar values and interests.',
    interests: ['Technology', 'Photography', 'Hiking', 'Cooking', 'Travel', 'Music', 'Reading', 'Fitness'],
    lifestyle: {
      drinking: 'Occasionally',
      smoking: 'Never',
      diet: 'Vegetarian',
      exercise: 'Regular'
    },
    family: {
      fatherOccupation: 'Business Owner',
      motherOccupation: 'Teacher',
      siblings: '1 Sister',
      familyType: 'Nuclear Family',
      familyValues: 'Traditional'
    },
    partner: {
      ageRange: '25-32',
      heightRange: '5\'4" - 6\'0"',
      education: 'Graduate or higher',
      profession: 'Any',
      location: 'San Francisco Bay Area'
    },
    photos: [
      'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1415131/pexels-photo-1415131.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    stats: {
      profileViews: 127,
      likes: 45,
      matches: 12,
      responseRate: '85%'
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Users size={18} /> },
    { id: 'photos', label: 'Photos', icon: <Camera size={18} /> },
    { id: 'preferences', label: 'Preferences', icon: <Heart size={18} /> },
    { id: 'privacy', label: 'Privacy', icon: <Shield size={18} /> }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Basic Info */}
      <Card title="Basic Information" icon={<Users size={20} className="text-[#1E2A49]" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Age</p>
                <p className="font-medium">{profileData.age} years</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Users className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Height</p>
                <p className="font-medium">{profileData.height}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{profileData.location}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Heart className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Marital Status</p>
                <p className="font-medium">{profileData.maritalStatus}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <Book className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Religion</p>
                <p className="font-medium">{profileData.religion}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Users className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Caste</p>
                <p className="font-medium">{profileData.caste}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Music className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Mother Tongue</p>
                <p className="font-medium">{profileData.motherTongue}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Hometown</p>
                <p className="font-medium">{profileData.hometown}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Professional Info */}
      <Card title="Professional Information" icon={<Briefcase size={20} className="text-[#1E2A49]" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <Briefcase className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Profession</p>
                <p className="font-medium">{profileData.profession}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Award className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Company</p>
                <p className="font-medium">{profileData.company}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <GraduationCap className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Education</p>
                <p className="font-medium">{profileData.education}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Book className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">University</p>
                <p className="font-medium">{profileData.university}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* About Me */}
      <Card title="About Me" icon={<Heart size={20} className="text-[#1E2A49]" />}>
        <p className="text-gray-700 leading-relaxed mb-4">{profileData.bio}</p>
        
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-3">Interests & Hobbies</h4>
          <div className="flex flex-wrap gap-2">
            {profileData.interests.map((interest, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[#F8CACA]/20 text-[#1E2A49] rounded-full text-sm font-medium"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </Card>

      {/* Lifestyle */}
      <Card title="Lifestyle" icon={<Coffee size={20} className="text-[#1E2A49]" />}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="bg-gray-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <Coffee className="w-6 h-6 text-gray-600" />
            </div>
            <p className="text-sm text-gray-500">Drinking</p>
            <p className="font-medium">{profileData.lifestyle.drinking}</p>
          </div>
          
          <div className="text-center">
            <div className="bg-gray-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <Users className="w-6 h-6 text-gray-600" />
            </div>
            <p className="text-sm text-gray-500">Smoking</p>
            <p className="font-medium">{profileData.lifestyle.smoking}</p>
          </div>
          
          <div className="text-center">
            <div className="bg-gray-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <Heart className="w-6 h-6 text-gray-600" />
            </div>
            <p className="text-sm text-gray-500">Diet</p>
            <p className="font-medium">{profileData.lifestyle.diet}</p>
          </div>
          
          <div className="text-center">
            <div className="bg-gray-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <Award className="w-6 h-6 text-gray-600" />
            </div>
            <p className="text-sm text-gray-500">Exercise</p>
            <p className="font-medium">{profileData.lifestyle.exercise}</p>
          </div>
        </div>
      </Card>

      {/* Family Information */}
      <Card title="Family Information" icon={<Users size={20} className="text-[#1E2A49]" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Father's Occupation</p>
              <p className="font-medium">{profileData.family.fatherOccupation}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Mother's Occupation</p>
              <p className="font-medium">{profileData.family.motherOccupation}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Siblings</p>
              <p className="font-medium">{profileData.family.siblings}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Family Type</p>
              <p className="font-medium">{profileData.family.familyType}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Family Values</p>
              <p className="font-medium">{profileData.family.familyValues}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderPhotos = () => (
    <div className="space-y-6">
      <Card title="Photo Gallery" icon={<Camera size={20} className="text-[#1E2A49]" />}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {profileData.photos.map((photo, index) => (
            <div key={index} className="relative group">
              <img
                src={photo}
                alt={`Profile ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <Button
                  variant="secondary"
                  size="small"
                  icon={<Edit size={16} />}
                >
                  Edit
                </Button>
              </div>
            </div>
          ))}
          
          {/* Add Photo Button */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex items-center justify-center hover:border-[#1E2A49] transition-colors cursor-pointer">
            <div className="text-center">
              <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Add Photo</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      <Card title="Partner Preferences" icon={<Heart size={20} className="text-[#1E2A49]" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Age Range</p>
              <p className="font-medium">{profileData.partner.ageRange}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Height Range</p>
              <p className="font-medium">{profileData.partner.heightRange}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Education</p>
              <p className="font-medium">{profileData.partner.education}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Profession</p>
              <p className="font-medium">{profileData.partner.profession}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{profileData.partner.location}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderPrivacy = () => (
    <div className="space-y-6">
      <Card title="Privacy Settings" icon={<Shield size={20} className="text-[#1E2A49]" />}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Profile Visibility</h4>
              <p className="text-sm text-gray-500">Control who can see your profile</p>
            </div>
            <select className="border border-gray-300 rounded-md px-3 py-2">
              <option>Everyone</option>
              <option>Premium Members Only</option>
              <option>Mutual Matches Only</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Photo Privacy</h4>
              <p className="text-sm text-gray-500">Who can see your photos</p>
            </div>
            <select className="border border-gray-300 rounded-md px-3 py-2">
              <option>All Members</option>
              <option>Premium Members</option>
              <option>After Connection</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Contact Information</h4>
              <p className="text-sm text-gray-500">Show contact details</p>
            </div>
            <button className="flex items-center space-x-2 text-[#1E2A49]">
              <Eye size={18} />
              <span>Visible</span>
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Online Status</h4>
              <p className="text-sm text-gray-500">Show when you're online</p>
            </div>
            <button className="flex items-center space-x-2 text-[#1E2A49]">
              <Eye size={18} />
              <span>Visible</span>
            </button>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto">
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <h1 className="text-xl font-semibold text-gray-900">My Profile</h1>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  icon={<Settings size={18} />}
                >
                  Settings
                </Button>
                <Button
                  variant={isEditing ? 'secondary' : 'primary'}
                  onClick={() => setIsEditing(!isEditing)}
                  icon={<Edit size={18} />}
                  className={isEditing ? '' : 'bg-[#1E2A49] hover:bg-[#2a3c69]'}
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Profile Card */}
              <Card className="mb-6">
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <img
                      src={profileData.profileImage}
                      alt={profileData.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
                    />
                    <button className="absolute bottom-0 right-0 bg-[#1E2A49] text-white rounded-full p-2 shadow-lg hover:bg-[#2a3c69] transition-colors">
                      <Camera size={16} />
                    </button>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">{profileData.name}</h2>
                  <p className="text-gray-600 mb-4">{profileData.profession}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-[#1E2A49]">{profileData.stats.profileViews}</p>
                      <p className="text-xs text-gray-500">Profile Views</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#1E2A49]">{profileData.stats.matches}</p>
                      <p className="text-xs text-gray-500">Matches</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Navigation */}
              <Card>
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-[#1E2A49] text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-3">{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'photos' && renderPhotos()}
              {activeTab === 'preferences' && renderPreferences()}
              {activeTab === 'privacy' && renderPrivacy()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
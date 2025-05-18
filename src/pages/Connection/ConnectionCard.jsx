import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ConnectionCard = ({
  id,
  name,
  age,
  occupation,
  distance,
  profileImage,
  isOnline,
  matchPercentage,
  interests,
  bio,
  lastMessageTime
}) => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate('/connections');
  };

  return (
    <div
      className="profile-card bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] transition-all cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img
          src={profileImage}
          alt={`${name} profile photo`}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <div className="absolute bottom-0 right-0 m-3 bg-white rounded-full p-1 shadow">
          <div className={`h-3 w-3 rounded-full ${isOnline ? 'bg-success' : 'bg-medium-gray'}`}></div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="font-bold text-dark text-lg">{name}, {age}</h4>
            <p className="text-medium-gray text-sm">{occupation}, {distance} miles away</p>
          </div>
          <div className="bg-primary bg-opacity-10 text-primary rounded-full px-2 py-1 text-xs font-bold">
            {matchPercentage}% Match
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {interests.map((interest) => (
            <span key={interest.id} className="text-xs bg-gray-100 rounded-full px-2 py-1">{interest}</span>
          ))}
        </div>
        <p className="text-medium-gray text-sm mb-3 line-clamp-2">{bio}</p>
        <div className="flex justify-between items-center">
          <div className="text-medium-gray text-sm">
            <MessageCircle className="inline-block mr-1 w-4 h-4" /> Last message: {lastMessageTime}
          </div>
          <button className="text-primary hover:text-primary/80 transition-all">
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;

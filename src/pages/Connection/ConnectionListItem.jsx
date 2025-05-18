import { MessageCircle, UserPlus, Heart } from "lucide-react";
import { Button } from "../../components/ui/button";
// import { Button } from "@/components/ui/button";

const ConnectionListItem = ({
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
  return (
    <div className="bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-4 transition-all hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="sm:w-40 flex-shrink-0">
          <img
            src={profileImage}
            alt={`${name} profile photo`}
            className="w-full h-40 sm:h-40 object-cover rounded-lg"
          />
        </div>
        <div className="flex-grow">
          <div className="flex flex-wrap justify-between mb-2">
            <div>
              <div className="flex items-center">
                <h3 className="text-xl font-bold text-dark mr-2">{name}, {age}</h3>
                <div className="flex items-center text-success">
                  <div className={`h-2 w-2 rounded-full ${isOnline ? 'bg-success' : 'bg-medium-gray'} mr-1`}></div>
                  <span className="text-xs">{isOnline ? 'Online' : 'Offline'}</span>
                </div>
              </div>
              <p className="text-medium-gray">{occupation}, {distance} miles away</p>
            </div>
            <div className="bg-primary bg-opacity-10 text-primary rounded-full px-3 py-1 text-sm font-bold h-fit">
              {matchPercentage}% Match
            </div>
          </div>
          <p className="text-medium-gray mb-4">{bio}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {interests.map((interest) => (
              <span key={interest.id} className="text-xs bg-gray-100 rounded-full px-2 py-1">{interest}</span>
            ))}
          </div>

          <div className="flex flex-wrap justify-between items-center gap-3">
            <div className="text-medium-gray text-sm">
              <MessageCircle className="inline-block mr-1 w-4 h-4" /> Last message: {lastMessageTime}
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="text-medium-gray hover:text-primary hover:border-primary">
                <UserPlus className="mr-1 w-4 h-4" /> View Profile
              </Button>
              <Button variant="outline" size="sm" className="text-medium-gray hover:text-primary hover:border-primary">
                <Heart className="mr-1 w-4 h-4" /> Favorite
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                <MessageCircle className="mr-1 w-4 h-4" /> Message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionListItem;

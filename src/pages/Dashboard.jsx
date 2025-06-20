import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ConnectionCard from "./Connection/ConnectionCard";
import StatCard from "../components/StatCard";
import { sampleUsers, statsData } from "../MockData";

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Dashboard Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-bold text-dark mb-2">Your Dashboard</h2>
        <p className="text-medium-gray">Welcome back, Emma! You have <span className="text-primary font-semibold">3 new</span> connection requests.</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {statsData.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            icon={stat.icon}
            borderColor={stat.borderColor}
          />
        ))}
      </div>

      {/* Connected Users Section */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-heading font-bold text-dark">Your Connections</h3>
          <Link to="/connections">
            <a className="text-primary hover:text-primary/80 transition-all font-semibold flex items-center">
              View All <ArrowRight className="ml-1 w-4 h-4" />
            </a>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {
            sampleUsers?.map((user) => (
              <ConnectionCard
                key={user.id}
                id={user.id}
                name={user.fullName}
                age={user.age}
                occupation={user.occupation || ""}
                distance={user.distance || 0}
                profileImage={user.profileImage || ""}
                isOnline={user.isOnline}
                matchPercentage={user.matchPercentage || 0}
                interests={user.interests}
                bio={user.bio || ""}
                lastMessageTime={user.lastMessageTime || ""}
              />
            ))
          }
        </div>
      </div>

      {/* Feature Suggestions Section */}
      {/* <div className="mb-10">
        <h3 className="text-2xl font-heading font-bold text-dark mb-6">Enhance Your Experience</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featureSuggestions.map((feature, index) => (
            <FeatureSuggestion 
              key={index}
              title={feature.title}
              description={feature.description}
              image={feature.image}
              actionText={feature.actionText}
            />
          ))}
        </div>
      </div> */}

      {/* Success Stories */}
      {/* <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-heading font-bold text-dark">Success Stories</h3>
          <a href="#" className="text-primary hover:text-primary/80 transition-all font-semibold flex items-center">
            Read More <ArrowRight className="ml-1 w-4 h-4" />
          </a>
        </div>
        
        <SuccessStory 
          quote={successStory.quote}
          names={successStory.names}
          timeline={successStory.timeline}
          profileImages={successStory.profileImages}
          weddingImage={successStory.weddingImage}
        />
      </div> */}
    </div>
  );
};

export default Dashboard;

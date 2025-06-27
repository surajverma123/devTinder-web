import React from "react";
import PropTypes from 'prop-types';
import ConnectionListItem from "./ConnectionListItem";
import { ChevronDown } from "lucide-react";

import { Button } from "../../components/ui/button";

const AllConnections = ({ connections }) => {
  const profileImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350";
  return (
    <div>
      {
					connections && connections.map((user) => (
						<ConnectionListItem
							key={user._id}
							id={user._id}
							name={user.fullName || `${user.firstName} ${user.lastName}`}
							age={user.age}
							occupation={user.occupation || ""}
							distance={user.distance || 0}
							profileImage={user.profileImage || profileImage }
							isOnline={user.isOnline}
							matchPercentage={user.matchPercentage || 0}
							interests={user.interests ||[]}
							bio={user.bio || ""}
							lastMessageTime={user.lastMessageTime || ""}
						/>
					))
				}

				{/* Load More Button */}
				<div className="flex justify-center mt-6">
					<Button
						variant="outline"
						className="flex items-center px-6 py-3 border border-gray-100 hover:border-primary text-medium-gray hover:text-primary font-semibold"
					>
						Load More <ChevronDown className="ml-1 w-4 h-4" />
					</Button>
				</div>
    </div>
  )
}

AllConnections.propTypes = {
  connections: PropTypes.arrayOf(Object)
}

export default AllConnections;
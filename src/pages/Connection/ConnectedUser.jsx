import { ArrowLeft, ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";

import { sampleUsers } from "../../MockData";
import ConnectionListItem from "./ConnectionListItem";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { addConnections } from "../../utils/conectionSlice";
import AllConnections from "./AllConnections";


const ConnectedUsers = () => {
	const navigate = useNavigate()
  const dispatch = useDispatch();
	const [currentTab, setCurrentTab] = useState(0);

	const connections = useSelector((store) => store.connections);
	
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      // Handle Error Case
      console.error(err);
    }
  };

	const handleBackClick = () => {
		navigate('/dashboard');
	};

		useEffect(() => {
			fetchConnections();
		}, []);

	return (
		<div className="container mx-auto px-4 py-8">
			{/* Connected List Header */}
			<div className="mb-8">
				<div className="flex items-center mb-2">
					<button
						onClick={handleBackClick}
						className="mr-3 text-medium-gray hover:text-primary transition-all"
					>
						<ArrowLeft className="w-5 h-5" />
					</button>
					<h2 className="text-3xl font-heading font-bold text-dark">Your Connections</h2>
				</div>
				<p className="text-medium-gray">Manage your current connections and explore new potential matches.</p>
			</div>

			{/* Connected List Filters */}
			<div className="bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-4 mb-8">
				<div className="flex flex-wrap items-center justify-between gap-4">
					<div className="flex flex-wrap items-center space-x-3">
						<Button className="bg-primary text-white">All Connections (24)</Button>
						<Button variant="ghost" className="text-medium-gray hover:text-primary hover:bg-gray-100">Online Now (8)</Button>
						<Button variant="ghost" className="text-medium-gray hover:text-primary hover:bg-gray-100">New Messages (5)</Button>
						<Button variant="ghost" className="text-medium-gray hover:text-primary hover:bg-gray-100">Favorites (3)</Button>
					</div>
					<div className="flex items-center space-x-2">
						<span className="text-medium-gray">Sort by:</span>
						<select className="border border-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:border-primary">
							<option>Recent Activity</option>
							<option>Match Percentage</option>
							<option>Newest First</option>
							<option>Alphabetical</option>
						</select>
					</div>
				</div>
			</div>

			{/* Connected Users List */}
			<div className="grid grid-cols-1 gap-4 mb-8">
				{currentTab === 0 && (<AllConnections connections={connections} />)}
			</div>
		</div>
	);
};

export default ConnectedUsers;

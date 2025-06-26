import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";

const UserProfile = () => {
  const data = useSelector((store) => store.user);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { userId } = useParams();
  
  const fetchUserDetails = async () => {
    const userDetails = await axios.get(BASE_URL + "/user/profile/" + userId, {
      withCredentials: true,
    });

    console.log("userDetails=========", userDetails.data);
    setUser(userDetails?.data?.user)
    setLoading(false);
    // setMessages(chatMessages);
  };
    useEffect(() => {
    fetchUserDetails();
  },[])

  if (loading) {
    return (
      <div>Loading....</div>
    )
  }


  return (
    !loading && (
      <div>
         <UserCard
          user={{ firstName: user?.firstName, lastName: user?.lastName, photoUrl: "", age: user?.age, gender: user?.gender, about: user?.about }}
        />
      </div>
    )
  );
};
export default UserProfile;

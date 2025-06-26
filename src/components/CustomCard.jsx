import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import axios from "axios";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
 
function CardDefault(user) {
  const dispatch = useDispatch();
  console.log("========= USER =============")
const handleSendRequest = async (status, userId) => {
  try {
    const res = await axios.post(
      BASE_URL + "/request/send/" + status + "/" + userId,
      {},
      { withCredentials: true }
    );
    dispatch(removeUserFromFeed(userId));
  } catch (err) {}
};
  return (
    <Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
          alt="card-image"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {user.user.firstName} {user.user.lastName}[{user.user.age && user.user.gender && user.user.gender + ", " + user.user.age}]
        </Typography>
        <Typography>
          {user.user.about}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
      <div className="flex w-max gap-4">
        <Button color="blue" onClick={() => handleSendRequest("ignored", user.user._id)}>Ignore</Button>
        <Button color="red" onClick={() => handleSendRequest("interested", user.user._id)}>Interested</Button>
      </div>
      </CardFooter>
    </Card>
  );
}

export default CardDefault;
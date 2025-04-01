import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const data = useSelector((store) => store.user);

  if (!data?.user) {
    return (
      <div>Loading....</div>
    )
  }
  return (
    data && data.user && (
      <div>
        <EditProfile user={data?.user} />
      </div>
    )
  );
};
export default Profile;

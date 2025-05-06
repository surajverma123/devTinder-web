import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../../utils/conectionSlice";
import { Link } from "react-router-dom";
import Layout from "./Layout";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
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

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1> No Connections Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about, status } =
          connection;

        return (
          <Layout
            key={_id}
            firstName={firstName}
            lastName={lastName}
            photoUrl={photoUrl}
            age={age}
            gender={gender}
            about={about}
            status={status}
            _id={ _id}
          />
        );
      })}
    </div>
  );
};
export default Connections;

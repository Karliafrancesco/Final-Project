import { useContext } from "react";
import { UserContext } from "./UserContext";

const Profile = () => {
   const { user } = useContext(UserContext);

   return <div>{user.name}</div>;
};

export default Profile;

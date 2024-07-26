import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserByUsername } from "../app/api/usersApiSlice";
import { Box, CircularProgress } from "@mui/material";
import ProfileForm from "../Components/Form/ProfileForm";

const Profile = () => {
  const { username } = useParams();
  const user = useSelector((state) => selectUserByUsername(state, username));

  if (!user) {
    return (
      <Box sx={{ display: "flex", marginTop: 8, alignItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return <ProfileForm user={user} />;
};

export default Profile;

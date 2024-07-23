import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ProfileForm from "../Components/features/profile/ProfileForm";
import { Box, CircularProgress } from "@mui/material";
import { createSelector } from "@reduxjs/toolkit";
import {
  selectAllUsers,
  selectUserById,
  selectUserByUsername,
} from "../app/api/usersApiSlice";

const Profile = () => {
  const { username } = useParams();

  const user = useSelector((state) => selectUserByUsername(state, username));

  console.log(user, username);
  const content = user ? (
    <ProfileForm user={user} />
  ) : (
    <Box sx={{ display: "flex", marginTop: 8, alignItems: "center" }}>
      <CircularProgress />
    </Box>
  );

  return content;
};
export default Profile;

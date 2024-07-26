import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "../../../app/api/usersApiSlice";
import EditUserForm from "../../Form/EditUserForm";
import { Box, CircularProgress } from "@mui/material";

const EditUser = () => {
  const { id } = useParams();

  const user = useSelector((state) => selectUserById(state, id));

  const content = user ? (
    <EditUserForm user={user} />
  ) : (
    <Box sx={{ display: "flex", marginTop: 8, alignItems: "center" }}>
      <CircularProgress />
    </Box>
  );

  return content;
};
export default EditUser;

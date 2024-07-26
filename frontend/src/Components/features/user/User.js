import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "../../../app/api/usersApiSlice";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { IconButton, TableCell, TableRow } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const User = ({ userId, serialNumber }) => {
  const user = useSelector((state) => selectUserById(state, userId));
  console.log(userId[1]);
  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/kelola-akun/${userId}`);

    return (
      <TableRow>
        <TableCell sx={{ maxWidth: 10 }}>{serialNumber}</TableCell>
        <TableCell align="center">{user.username}</TableCell>
        <TableCell align="center">{user.name}</TableCell>
        <TableCell align="center">{user.role}</TableCell>
        <TableCell align="center">{user.phoneNumber}</TableCell>
        <TableCell align="center">
          {user.active ? (
            <>
              <CheckCircleIcon
                fontSize="small"
                color="success"
                sx={{ verticalAlign: "top", mr: 1 }}
              />
              Active
            </>
          ) : (
            <>
              <CancelIcon
                fontSize="small"
                color="error"
                sx={{ verticalAlign: "top", mr: 1 }}
              />
              Inactive
            </>
          )}
        </TableCell>
        <TableCell align="center">
          <IconButton onClick={handleEdit}>
            <EditNoteIcon fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  } else return null;
};

export default User;

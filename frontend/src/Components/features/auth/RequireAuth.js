import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Container, Typography } from "@mui/material";
import NoAccessPage from "./NoAccessPage";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const { role } = useAuth();
  const roleArray = Array.isArray(role) ? role : [role];
  if (!role) {
    return <NoAccessPage></NoAccessPage>;
  }
  const content = roleArray.some((pos) => allowedRoles.includes(pos)) ? (
    <Outlet />
  ) : (
    <NoAccessPage></NoAccessPage>
  );

  return content;
};
export default RequireAuth;

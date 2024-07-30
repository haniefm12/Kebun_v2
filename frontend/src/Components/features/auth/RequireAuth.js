import { Outlet } from "react-router-dom";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import NoAccessPage from "./NoAccessPage";

const RequireAuth = ({ allowedRoles }) => {
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

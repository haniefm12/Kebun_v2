import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const { role } = useAuth();
  const roleArray = Array.isArray(role) ? role : [role];
  if (!role) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  const content = roleArray.some((pos) => allowedRoles.includes(pos)) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );

  return content;
};
export default RequireAuth;

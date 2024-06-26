import { useRef, useState } from "react";
import { useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSendLogoutMutation } from "../../../app/api/authApiSlice";

const useNavbar = () => {
  const anchorRef = useRef(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const user = "John Doe";
  const role = "Admin";
  const account = [user, role];
  const settings = ["Profile", "Logout"];

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/login");
  }, [isSuccess, navigate]);

  // if (isLoading) return <p>Logging Out...</p>;

  // if (isError) return <p>Error: {error.data?.message}</p>;

  return {
    anchorElUser,
    anchorRef,
    handleOpenUserMenu,
    handleCloseUserMenu,
    sendLogout,
    account,
    settings,
  };
};

export default useNavbar;

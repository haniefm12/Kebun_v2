import { useState } from "react";

const useNavbar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const user = "John Doe";
  const role = "Admin";
  const account = [user, role];
  const settings = ["Profile", "Logout"];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return {
    anchorElUser,
    handleOpenUserMenu,
    handleCloseUserMenu,
    account,
    settings,
  };
};

export default useNavbar;

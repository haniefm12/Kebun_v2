import React from "react";
import ParkIcon from "@mui/icons-material/Park";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MaterialUISwitch from "../../Switch";
import MenuIcon from "@mui/icons-material/MenuOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../../../app/api/authApiSlice";
import useAuth from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import { selectUserByUsername } from "../../../app/api/usersApiSlice";
import LoadingState from "../../state/LoadingState";

const Navbar = ({ setMode, mode, isSidebarOpen, setIsSidebarOpen }) => {
  const { name, username, status } = useAuth();
  const user = useSelector((state) => selectUserByUsername(state, username));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const profileImage = user ? user.image : "";

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const [sendLogout, { isLoading, isError, error }] = useSendLogoutMutation();

  const handleLogout = () => {
    sendLogout().then(() => {
      navigate("/login", { replace: true }); // Navigate to a different page after logging out
    });
  };
  const handleProfile = () => {
    navigate(`/profile/${username}`);
    setAnchorEl(null);
  };

  if (isLoading) return <LoadingState />;

  if (isError) return <p>Error: {error.data?.message}</p>;

  return (
    <AppBar position="static">
      <Container maxWidth="100%">
        <Toolbar>
          {!isSidebarOpen && (
            <IconButton onClick={() => setIsSidebarOpen(true)}>
              <MenuIcon sx={{ color: "#ffff" }} />
            </IconButton>
          )}
          {!isSidebarOpen && (
            <>
              <ParkIcon
                sx={{
                  display: { xs: "none", md: "flex" },
                  mr: 1,
                }}
              />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                KEBUN
              </Typography>
            </>
          )}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}></Box>
          {!isSidebarOpen && (
            <>
              <ParkIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                KEBUN
              </Typography>
            </>
          )}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Toggle dark mode">
              <MaterialUISwitch
                checked={mode === "dark"}
                onChange={() => setMode(mode === "dark" ? "light" : "dark")}
              />
            </Tooltip>

            <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
              <Tooltip title="Open settings" arrow>
                <Avatar src={profileImage} />
              </Tooltip>
            </IconButton>
            {anchorEl && (
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                disableScrollLock
              >
                <MenuItem>
                  <Avatar src={profileImage}></Avatar>
                  <Box flexDirection="column" alignItems="start" ml="10px">
                    <Typography variant="body1" textAlign="center">
                      {name}
                    </Typography>
                    <Typography variant="caption" textAlign="center">
                      {status}
                    </Typography>
                  </Box>
                </MenuItem>

                <MenuItem onClick={handleProfile}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;

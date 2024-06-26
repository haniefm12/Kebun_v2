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
// import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Divider, Switch, styled } from "@mui/material";
import MaterialUISwitch from "../../Switch";
import useNavbar from "./index.hooks";
import { ChevronLeft } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/MenuOutlined";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSendLogoutMutation } from "../../../app/api/authApiSlice";

const Navbar = ({ setMode, mode, isSidebarOpen, setIsSidebarOpen }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [tooltipOpen, setTooltipOpen] = useState(true);
  const open = Boolean(anchorEl);
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();
  const handleLogout = async () => {
    await sendLogout();
  };
  useEffect(() => {
    if (isSuccess) {
      console.log("Navigating to /login");
      navigate("/login", { replace: true });
    }
  }, [isSuccess, navigate]);

  if (isLoading) return <p>Logging Out...</p>;

  if (isError) return <p>Error: {error.data?.message}</p>;

  return (
    <AppBar position="static">
      <Container maxWidth="100%">
        <Toolbar disableGutters>
          {!isSidebarOpen && (
            <IconButton onClick={() => setIsSidebarOpen(true)}>
              <MenuIcon sx={{ color: "#ffff" }} />
            </IconButton>
          )}
          {isSidebarOpen ? null : (
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
                  // fontFamily: 'monospace',
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
          {isSidebarOpen ? null : (
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
                  // fontFamily: 'monospace',
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
            <Tooltip>
              <MaterialUISwitch
                checked={mode === "dark"}
                onChange={() => setMode(mode === "dark" ? "light" : "dark")}
              ></MaterialUISwitch>
            </Tooltip>

            <Tooltip title="Open settings" arrow>
              <IconButton
                onMouseEnter={() => setTooltipOpen(true)}
                onMouseLeave={() => setTooltipOpen(false)}
                onClick={handleAvatarClick}
                sx={{ p: 0 }}
              >
                <Avatar />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem>
                  <Avatar></Avatar>
                  <Box flexDirection="column" alignItems="start" ml="10px">
                    <Typography variant="body1" textAlign="center">
                      Nama
                    </Typography>
                    <Typography variant="caption" textAlign="center">
                      Role
                    </Typography>
                  </Box>
                </MenuItem>

                <Divider></Divider>
                <MenuItem>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem title="Logout" onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;

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
// import DarkModeIcon from "@mui/icons-material/DarkMode";
// import LightModeIcon from "@mui/icons-material/LightMode";
import MaterialUISwitch from "../../Switch";
import useNavbar from "./index.hooks";
import { ChevronLeft } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/MenuOutlined";

const Navbar = ({ setMode, mode, isSidebarOpen, setIsSidebarOpen }) => {
  const {
    anchorElUser,
    handleOpenUserMenu,
    handleCloseUserMenu,
    account,
    settings,
  } = useNavbar();

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
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar></Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Avatar></Avatar>
                <Box flexDirection="column" alignItems="start" ml="10px">
                  {account.map((element, index) => (
                    <Typography
                      align="center"
                      variant={index === 0 ? "body1" : "caption"}
                    >
                      {element}
                    </Typography>
                  ))}
                </Box>
              </MenuItem>
              <Divider></Divider>
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;

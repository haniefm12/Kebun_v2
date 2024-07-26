import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Layout/Navbar/Navbar";
import Sidebar from "./Layout/Sidebar";

const Layout = ({ setMode, mode }) => {
  const location = useLocation();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [hideNavbarAndSidebar, setHideNavbarAndSidebar] = useState(false);
  useEffect(() => {
    if (location.pathname === "/login") {
      setHideNavbarAndSidebar(true);
    } else {
      setHideNavbarAndSidebar(false);
    }
  }, [location]);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      {!hideNavbarAndSidebar && (
        <Sidebar
          isNonMobile={isNonMobile}
          drawerWidth="250px"
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      )}
      <Box flexGrow={1}>
        {!hideNavbarAndSidebar && (
          <Navbar
            setMode={setMode}
            mode={mode}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        )}
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;

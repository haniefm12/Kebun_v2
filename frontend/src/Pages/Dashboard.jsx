import { Box, Button } from "@mui/material";
import React from "react";
import { useEffect } from "react";

import { useNavigate, Link, useLocation } from "react-router-dom";

import { useSendLogoutMutation } from "../app/api/authApiSlice";
const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;
const Dashboard = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/login");
  }, [isSuccess, navigate]);

  if (isLoading) return <p>Logging Out...</p>;

  if (isError) return <p>Error: {error.data?.message}</p>;
  let dashClass = null;
  if (
    !DASH_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = "dash-header__container--small";
  }

  const logoutButton = (
    <button className="icon-button" title="Logout" onClick={sendLogout}>
      <Button>Logout</Button>
    </button>
  );

  return (
    <Box bgcolor="lightgrey" flex={5} p={2}>
      <div className={`dash-header__container ${dashClass}`}>
        <Link to="/login">
          <h1 className="dash-header__title">techNotes</h1>
        </Link>
        Dashboard
        {logoutButton}
      </div>
    </Box>
  );
};

export default Dashboard;

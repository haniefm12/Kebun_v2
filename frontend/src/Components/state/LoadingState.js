import React from "react";
import { CircularProgress, Typography } from "@mui/material";

const LoadingState = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress size={40} color="primary" />
      <Typography variant="h5" color="primary" sx={{ ml: 2 }}>
        Loading...
      </Typography>
    </div>
  );
};

export default LoadingState;

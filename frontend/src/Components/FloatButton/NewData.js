import React from "react";
import { Fab } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const NewData = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    const currentPath = location.pathname;
    const newPath = `${currentPath}/new`;
    navigate(newPath);
  };

  return (
    <Fab
      color="primary"
      size="large"
      sx={{
        position: "fixed",
        bottom: 35,
        right: 35,
      }}
      onClick={handleClick}
    >
      <AddIcon />
    </Fab>
  );
};

export default NewData;

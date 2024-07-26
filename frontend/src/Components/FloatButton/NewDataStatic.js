import React from "react";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const NewDataStatic = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate(`${pathname}/new`);
  };

  const buttonText = `Tambah Data ${pathname.split("/").pop()}`;

  return (
    <Button variant="contained" color="primary" onClick={handleCreate}>
      {buttonText}
    </Button>
  );
};

export default NewDataStatic;

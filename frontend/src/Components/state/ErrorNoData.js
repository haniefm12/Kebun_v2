import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import NewDataStatic from "../FloatButton/NewDataStatic";
import { useLocation } from "react-router-dom";

const ErrorNoData = ({ error }) => {
  const { pathname } = useLocation();
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12}>
        {error.data && (
          <Typography variant="h5" color="error" align="center">
            {" "}
            Tidak ada data {pathname.split("/").pop()}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} pt={2}>
        <NewDataStatic />
      </Grid>
    </Grid>
  );
};

export default ErrorNoData;

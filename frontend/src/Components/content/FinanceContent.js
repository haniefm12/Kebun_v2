import React from "react";
import { Grid, Typography } from "@mui/material";
import { useFinances } from "../../app/api/api";

function FinanceContent() {
  const { data: finances, isLoading, isSuccess, isError } = useFinances();

  if (isLoading) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  if (isError) {
    return (
      <Typography align="center" variant="body1">
        Total Pengeluaran : Rp. 0,-
      </Typography>
    );
  }

  if (isSuccess) {
    return (
      <Grid container spacing={0}>
        <Grid item xs={6} md={6} xl={6} sx={{ pt: 1 }}>
          <Typography variant="body1" align="center">
            Total Pengeluaran:{" "}
          </Typography>
        </Grid>
        <Grid item xs={6} md={6} xl={6} sx={{ pt: 1 }}>
          <Typography variant="body1" align="center">
            {" "}
            Rp.{" "}
            {Object.keys(finances.entities)
              .reduce((acc, financeId) => {
                return acc + (finances.entities[financeId].totalCost || 0);
              }, 0)
              .toLocaleString("id-ID")}
            ,-
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return null;
}

export default FinanceContent;

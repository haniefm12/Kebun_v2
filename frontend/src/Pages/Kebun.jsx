import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";

import KebunCard from "../Components/Card/KebunCard";
import NewData from "../Components/FloatButton/NewData";
import { useGardens } from "../app/api/api";
import LoadingState from "../Components/state/LoadingState";
import ErrorNoData from "../Components/state/ErrorNoData";

const Kebun = () => {
  const { data: gardens, isLoading, isError, error } = useGardens();

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorNoData error={error} />;

  const { ids } = gardens;
  const cardContent = ids?.map((gardenId) => (
    <Grid item xs={12} sm={6} md={4} xl={3} key={gardenId}>
      <KebunCard gardenId={gardenId.toString()} />
    </Grid>
  ));

  return (
    <Container maxWidth="xl">
      <Box pl={2} pb={2} pt={2} pr={2}>
        <Typography pl={0} pb={1} variant="h4">
          Daftar Kebun
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {cardContent}
        </Grid>
      </Box>
      <NewData />
    </Container>
  );
};

export default Kebun;

import { Box, Button, Container, Fab, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import {
  selectGardenById,
  useGetGardensQuery,
} from "../app/api/gardensApiSlice";
import { red } from "@mui/material/colors";
import KebunCard from "../Components/Card/KebunCard";
import { useSelector } from "react-redux";

const Kebun = () => {
  const navigate = useNavigate();

  const {
    data: gardens,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetGardensQuery("gardenList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;
  if (isLoading) content = <Typography>Loading...</Typography>;

  if (isError) {
    content = (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <Typography variant="h5" color="error" align="center">
            {error?.data?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} pt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/kebun/new")}
          >
            Tambah Kebun
          </Button>
        </Grid>
      </Grid>
    );
  }
  if (isSuccess) {
    const { ids } = gardens;

    const cardContent = ids?.length
      ? ids.map((gardenId) => (
          <Grid item xs={12} sm={6} md={4} xl={3} key={gardenId}>
            <KebunCard gardenId={gardenId.toString()} />
          </Grid>
        ))
      : null;

    content = (
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
        <Fab
          color="primary"
          size="large"
          sx={{
            position: "fixed",
            bottom: 35,
            right: 35,
          }}
          onClick={() => navigate("/kebun/new")}
        >
          <AddIcon />
        </Fab>
      </Container>
    );
  }

  return content;
};

export default Kebun;

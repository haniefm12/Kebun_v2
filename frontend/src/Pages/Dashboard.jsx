import React from "react";
import { Grid, Typography, Card, CardContent } from "@mui/material";

import GardenContent from "../Components/content/GardenContent";
import FinanceContent from "../Components/content/FinanceContent";
import NotesContent from "../Components/content/NotesContent";

function Dashboard() {
  return (
    <Grid container spacing={2} sx={{ pl: 4, pt: 2 }}>
      <Grid item xs={12} md={6} lg={7} xl={8}>
        <Typography variant="h4">Dashboard</Typography>
      </Grid>

      <Grid item xs={12} sm={12} md={8}>
        <Card sx={{ pr: 1, pl: 1, pb: 1 }}>
          <Typography
            variant="h5"
            sx={{ fontStyle: "bold", pl: 2, pt: 2, pb: 1 }}
          >
            Perkembangan Kebun
          </Typography>
          <GardenContent></GardenContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={12} md={4} sx={{ pr: 4 }}>
        <Card sx={{ mt: 0, mb: 1 }}>
          <CardContent
            sx={{
              mt: 0,
              mb: 0,
              p: 0,
              pl: 1,
              pt: 3,
              alignContent: "center",
            }}
          >
            <FinanceContent />
          </CardContent>
        </Card>
        <Card sx={{ mt: 0 }}>
          <CardContent sx={{ mr: 0, pr: 0 }}>
            <NotesContent />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Dashboard;

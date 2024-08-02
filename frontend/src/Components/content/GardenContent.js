import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  ListItem,
  ListItemText,
  CardHeader,
  CardMedia,
} from "@mui/material";
import { formatDateTime } from "../../utils/formatDateTime";
import { useGardens } from "../../app/api/api";
import { DEFAULT_IMAGE } from "../../config/urls";
import LoadingState from "../state/LoadingState";

function GardenContent() {
  const { data: gardens, isLoading, isSuccess, isError, error } = useGardens();
  if (isLoading) {
    return <LoadingState />;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  if (isSuccess) {
    return (
      <Grid container spacing={2} display="flex" flexWrap="wrap">
        {Object.keys(gardens.entities)
          .sort((a, b) => {
            if (
              gardens.entities[a].updatedAt &&
              gardens.entities[b].updatedAt
            ) {
              return gardens.entities[b].updatedAt.localeCompare(
                gardens.entities[a].updatedAt
              );
            } else {
              return 0;
            }
          })
          .slice(0, 4)
          .map((gardenId, index) => (
            <Grid item key={gardenId} xs={12} sm={12} md={12} lg={6}>
              <Card
                sx={{
                  minHeight: 320,
                  maxHeight: 320,
                  border: "1px solid #FFFFFF",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                  overflowY: "auto", // tambahkan overflowY
                }}
              >
                <Grid container>
                  <Grid item xs={12} sm={6} md={5}>
                    <CardMedia
                      sx={{ mt: 1, ml: 1, borderRadius: 1 }}
                      component="img"
                      height="200"
                      image={
                        gardens.entities[gardenId] &&
                        gardens.entities[gardenId].image
                          ? gardens.entities[gardenId].image
                          : DEFAULT_IMAGE.KEBUN
                      }
                      alt="No Image"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={7}>
                    <CardHeader
                      titleTypographyProps={{ fontWeight: "bold" }}
                      title={gardens.entities[gardenId].name}
                      subheader={gardens.entities[gardenId].address}
                      sx={{ mb: 0, pb: 0 }}
                    />
                    <CardContent
                      sx={{
                        mt: 0,
                        pt: 2,
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                      }}
                    >
                      <Typography variant="body2">
                        {gardens.entities[gardenId].description}
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
                <Typography sx={{ ml: 2, mt: 2, mb: 0 }} paragraph>
                  Catatan:
                </Typography>
                <div>
                  {gardens.entities[gardenId].notes &&
                  gardens.entities[gardenId].notes.length > 0 ? (
                    [...gardens.entities[gardenId].notes]
                      .sort((a, b) => {
                        if (a.date && b.date) {
                          return b.date.localeCompare(a.date);
                        } else {
                          return 0;
                        }
                      })
                      .slice(1, 3)
                      .map((note, index) => (
                        <ListItem key={index}>
                          <ListItemText>
                            <Typography variant="body2">
                              {note.note ? note.note : "Tidak ada catatan"}{" "}
                              {/* show "Tidak ada catatan" if note.note is null or undefined */}
                            </Typography>

                            <Typography variant="caption">
                              {formatDateTime(note.date)}
                            </Typography>
                          </ListItemText>
                        </ListItem>
                      ))
                  ) : (
                    <Typography>Tidak ada catatan</Typography>
                  )}
                </div>
              </Card>
            </Grid>
          ))}
      </Grid>
    );
  }
  return null;
}
export default GardenContent;

import React from "react";
import {
  Grid,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const GardenPage = ({ garden }) => {
  return (
    <Container maxWidth="lg" sx={{ pl: 1, mt: 4, mb: 4, ml: 3 }}>
      <Typography gutterBottom variant="h4" component="div">
        {garden.name}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} sx={{ pr: 0 }}>
          <Card sx={{ maxWidth: "100%", mr: 2 }}>
            <CardMedia
              component="img"
              height="300"
              image={garden.image}
              alt={garden.name}
            />
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Alamat : {garden.address}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Luas kebun sekitar {(garden.area / 10000).toFixed(1)} hektar (
                {garden.area} m²)
              </Typography>
            </CardContent>
            <CardActions>
              <CardActions>
                <CardActions>
                  <a
                    href={garden.image}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="small" color="primary">
                      Lihat Gambar
                    </Button>
                  </a>
                </CardActions>
              </CardActions>
            </CardActions>
          </Card>
          <Typography variant="caption" component="h2">
            Data {garden.name} dibuat pada{" "}
            {new Date(garden.createdAt).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
          </Typography>
          <Typography variant="caption" component="h2">
            dan terkahir diperbaharui pada{" "}
            {new Date(garden.updatedAt).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Typography variant="h6" component="h2">
            Deskripsi
          </Typography>
          <Typography variant="body1" paragraph>
            {garden.description}
          </Typography>
          <Typography variant="h6" component="h2">
            Catatan
          </Typography>
          <ul>
            {garden.notes
              .slice(1)
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((note, index) => (
                <li key={index}>
                  <Typography variant="body1" paragraph>
                    {note.note} -{" "}
                    {new Date(note.date).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                </li>
              ))}
          </ul>
        </Grid>
      </Grid>
    </Container>
  );
};

export default GardenPage;

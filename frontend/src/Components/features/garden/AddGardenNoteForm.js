import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAddNewGardenNoteMutation } from "../../../app/api/gardensApiSlice";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const AddNewGardenNoteForm = ({ garden }) => {
  const [addNewGardenNote, { isLoading, isSuccess, isError, error }] =
    useAddNewGardenNoteMutation();
  const navigate = useNavigate();
  const [note, setNote] = useState("");

  console.log(garden);
  console.log(garden.id);

  const canSave = [note].every(Boolean) && !isLoading;

  const onSaveNoteClicked = async () => {
    if (canSave) {
      try {
        await addNewGardenNote({
          id: garden.id,
          note,
        }).then((response) => {
          console.log("Update User Response: ", response);
          navigate("/kebun");
        });
      } catch (err) {
        console.error("Failed to save the note: ", err);
      }
    }
  };

  const onNoteChanged = (e) => setNote(e.target.value);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Tambah Catatan Baru
        </Typography>
        <Typography component="h1" variant="h5">
          Untuk {garden.name}
        </Typography>
        <Card sx={{ mt: 3 }}>
          <CardMedia
            component="img"
            height="200"
            image={garden.image}
            alt={garden.name}
          />
          <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="note"
                  label="Catatan"
                  value={note}
                  onChange={onNoteChanged}
                  multiline
                  rows={10}
                  sx={{ width: "500px" }}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onSaveNoteClicked}
              disabled={!canSave}
            >
              Save Note
            </Button>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default AddNewGardenNoteForm;

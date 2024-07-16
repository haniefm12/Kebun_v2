import React from "react";
import { useGetNotesQuery } from "../app/api/notesApiSlice";
import AddIcon from "@mui/icons-material/Add";
import NoteCard from "../Components/Card/NoteCard";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  Box,
  Container,
  Fab,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const Tugas = () => {
  const navigate = useNavigate();
  const { username, isManager, isAdmin } = useAuth();

  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery("noteList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <Typography>Loading...</Typography>;

  if (isError) {
    content = (
      <Box variant="h1" className="errmsg">
        {error?.data?.message}
      </Box>
    );
  }

  if (isSuccess) {
    const { ids } = notes;

    const cardNoteContent = ids?.length
      ? ids.map((noteId) => (
          <Grid item xs={12} sm={6} md={4} xl={3} key={noteId}>
            <NoteCard noteId={noteId.toString()} />
          </Grid>
        ))
      : null;

    content = (
      <Container maxWidth="xl">
        <Box pl={2} pb={2} pt={2} pr={2}>
          <Typography pl={0} pb={1} variant="h4">
            Daftar Tugas
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {cardNoteContent}
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
          onClick={() => navigate("/tugas/new")}
        >
          <AddIcon />
        </Fab>
      </Container>
    );
  }

  return content;
};

export default Tugas;

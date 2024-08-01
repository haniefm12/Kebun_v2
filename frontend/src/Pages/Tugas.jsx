import React from "react";
import NoteCard from "../Components/Card/NoteCard";
import useAuth from "../hooks/useAuth";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUserByUsername } from "../app/api/usersApiSlice";
import { useNotes } from "../app/api/api";
import LoadingState from "../Components/state/LoadingState";
import ErrorNoData from "../Components/state/ErrorNoData";
import NewData from "../Components/FloatButton/NewData";

const Tugas = () => {
  const { username, isManager, isAdmin } = useAuth();
  const user = useSelector((state) => selectUserByUsername(state, username));

  const { data: notes, isLoading, isError, error } = useNotes();

  let tombolTambah;

  const getFilteredIds = () => {
    if (isManager || isAdmin) {
      tombolTambah = <NewData />;

      return [...notes.ids];
    } else {
      tombolTambah = null;
      return notes.ids.filter(
        (noteId) => notes.entities[noteId].user === user.id
      );
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return <ErrorNoData error={error} />;
  }

  const filteredIds = getFilteredIds();
  return (
    <Container maxWidth="xl">
      <Box pl={2} pb={2} pt={2} pr={2}>
        <Typography pl={0} pb={1} variant="h4">
          Daftar Tugas
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {filteredIds.map((noteId) => (
            <Grid item xs={12} sm={6} md={4} xl={3} key={noteId}>
              <NoteCard noteId={noteId.toString()} />
            </Grid>
          ))}
        </Grid>
      </Box>
      {tombolTambah}
    </Container>
  );
};

export default Tugas;

// NotesContent.js
import React from "react";
import { Card, CardContent, Checkbox, Stack, Typography } from "@mui/material";
import { useNotes } from "../../app/api/api";

function NotesContent() {
  const { data: notes, isLoading, isSuccess, isError } = useNotes();

  if (isLoading) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  if (isError) {
    return (
      <Typography variant="h5">
        Data Tidak Ditemukan : {Error?.data?.message}
      </Typography>
    );
  }
  const noteElement = Object.keys(notes.entities)
    .sort((a, b) => {
      const noteA = notes.entities[a];
      const noteB = notes.entities[b];
      return noteA.completed - noteB.completed;
    })
    .map((noteId, index) => {
      const note = notes.entities[noteId];
      const thisDay = new Date();
      thisDay.setDate(thisDay.getDate());
      const scheduleDate = new Date(note.schedule);
      const thisDayYear = thisDay.getFullYear();
      const thisDayMonth = thisDay.getMonth();
      const thisDayDay = thisDay.getDate();
      const scheduleYear = scheduleDate.getFullYear();
      const scheduleMonth = scheduleDate.getMonth();
      const scheduleDay = scheduleDate.getDate();
      if (
        scheduleYear === thisDayYear &&
        scheduleMonth === thisDayMonth &&
        scheduleDay === thisDayDay
      ) {
        return (
          <Card
            key={noteId}
            sx={{
              mt: 1,
              mb: 2,
              mr: 2,
              border: "1px solid #FFFFFF", // add white border
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <CardContent sx={{ p: 2, display: "flex" }}>
              <Checkbox checked={note.completed} />
              <Stack sx={{ ml: 1 }}>
                <Typography variant="h6">{note.title}</Typography>
                <Typography variant="body2">{note.text}</Typography>
              </Stack>
            </CardContent>
          </Card>
        );
      } else {
        return null;
      }
    });

  if (isSuccess) {
    return (
      <>
        <Typography variant="h5">Tugas Saya Hari Ini</Typography>
        {noteElement.length > 0 ? (
          noteElement
        ) : (
          <Typography variant="body1">
            Tidak ada tugas untuk hari ini
          </Typography>
        )}
      </>
    );
  }

  return null;
}

export default NotesContent;

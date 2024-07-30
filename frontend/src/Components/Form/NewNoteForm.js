import React, { useState, useEffect } from "react";
import { useAddNewNoteMutation } from "../../app/api/notesApiSlice";
import { useGetUsersQuery } from "../../app/api/usersApiSlice";
import { useGetGardensQuery } from "../../app/api/gardensApiSlice";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Description } from "@mui/icons-material";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { REGEX } from "../../config/regex";
import LoadingState from "../state/LoadingState";

const NewNoteForm = () => {
  const [addNewNote, { isLoading, isSuccess }] = useAddNewNoteMutation();
  const navigate = useNavigate();

  const { users, isLoading: isUsersLoading } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });
  const { gardens, isLoading: isGardensLoading } = useGetGardensQuery(
    "gardensList",
    {
      selectFromResult: ({ data }) => ({
        gardens: data?.ids.map((id) => data?.entities[id]),
      }),
    }
  );

  const [gardenId, setGardenId] = useState("");
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [validTitle, setValidTitle] = useState(false);
  const [text, setText] = useState("");
  const [validText, setValidText] = useState(false);
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    setValidTitle(REGEX.TITLE.test(title));
  }, [title]);

  useEffect(() => {
    setValidText(REGEX.TEXT.test(text));
  }, [text]);

  useEffect(() => {
    if (isSuccess) {
      setGardenId("");
      setUserId("");
      setTitle("");
      setText("");
      setSchedule(null);
      navigate("/tugas");
    }
  }, [isSuccess, navigate]);

  const onGardenIdChanged = (e) => setGardenId(e.target.value);
  const onUserIdChanged = (e) => setUserId(e.target.value);
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);

  const onScheduleChanged = (newDate) => {
    const utcDate = new Date(
      `${newDate.getFullYear()}-${padZero(newDate.getMonth() + 1)}-${padZero(
        newDate.getDate()
      )}T00:00:00.000Z`
    );
    setSchedule(utcDate);
  };

  // Helper function to pad zero
  const padZero = (num) => {
    return (num < 10 ? "0" : "") + num;
  };
  const canSave =
    [
      validTitle,
      validText,
      userId !== "",
      schedule !== null,
      gardenId !== "",
    ].every(Boolean) && !isLoading;

  const onSaveNoteClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        await addNewNote({
          garden: gardenId,
          user: userId,
          title,
          text,
          schedule,
        });
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  if (isUsersLoading || isGardensLoading) {
    return <LoadingState />;
  }

  const content = (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns} tz="Asia/Jakarta">
        {/* ... */}
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
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <Description />
            </Avatar>
            <Typography component="h1" variant="h5">
              Tambah Tugas Baru
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={onSaveNoteClicked}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel outlined="true" required>
                      Tugas untuk
                    </InputLabel>
                    <Select
                      required
                      value={userId}
                      onChange={onUserIdChanged}
                      fullWidth
                      id="userId"
                      name="userId"
                      label="Tugas untuk"
                    >
                      {users &&
                        users.map((user) => (
                          <MenuItem key={user.id} value={user.id}>
                            {user.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel outlined="true" required>
                      Tugas di
                    </InputLabel>
                    <Select
                      required
                      value={gardenId}
                      onChange={onGardenIdChanged}
                      fullWidth
                      id="gardenId"
                      name="gardenId"
                      label="Tugas di"
                    >
                      {gardens &&
                        gardens.map((garden) => (
                          <MenuItem key={garden.id} value={garden.id}>
                            {garden.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    type="text"
                    value={title}
                    onChange={onTitleChanged}
                    fullWidth
                    id="title"
                    label="Judul Tugas"
                    name="title"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    type="text"
                    value={text}
                    onChange={onTextChanged}
                    fullWidth
                    id="text"
                    label="Deskripsi Tugas"
                    name="text"
                  />
                </Grid>

                <Grid item xs={12}>
                  <DatePicker
                    label="Pilih jadwal tugas"
                    value={schedule}
                    onChange={onScheduleChanged}
                  >
                    {(params) => <TextField {...params} />}
                  </DatePicker>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={!canSave}
                  >
                    Tambah Tugas
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </LocalizationProvider>
    </>
  );

  return content;
};
export default NewNoteForm;

import React, { useState, useEffect } from "react";
import { useAddNewNoteMutation } from "../../../app/api/notesApiSlice";
import {
  useGetUsersQuery,
  selectUserById,
} from "../../../app/api/usersApiSlice";
import {
  selectGardenById,
  useGetGardensQuery,
} from "../../../app/api/gardensApiSlice";
import { Link, useNavigate } from "react-router-dom";
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

const NOTE_TITLE_REGEX = /^[A-z\s\d+]{3,50}$/;
const NOTE_TEXT_REGEX = /^[A-z\s,\.\d+]{3,1000}$/;

const NewNoteForm = () => {
  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation();
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

  //   useEffect(() => {
  //     if (users && users.length > 0) {
  //       setUserId(users[0].id);
  //     }
  //   }, [users]);

  //   useEffect(() => {
  //     if (gardens && gardens.length > 0) {
  //       setGardenId(gardens[0].id);
  //     }
  //   }, [gardens]);

  useEffect(() => {
    setValidTitle(NOTE_TITLE_REGEX.test(title));
  }, [title]);

  useEffect(() => {
    setValidText(NOTE_TEXT_REGEX.test(text));
  }, [text]);

  useEffect(() => {
    if (isSuccess) {
      setGardenId("");
      setUserId("");
      setTitle("");
      setText("");
      navigate("/tugas");
    }
  }, [isSuccess, navigate]);

  const onGardenIdChanged = (e) => setGardenId(e.target.value);
  const onUserIdChanged = (e) => setUserId(e.target.value);
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);

  const canSave = [validTitle, validText].every(Boolean) && !isLoading;

  const onSaveNoteClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        await addNewNote({
          garden: gardenId,
          user: userId,
          title,
          text,
        });
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  if (isUsersLoading || isGardensLoading) {
    return <div>Loading...</div>;
  }

  const content = (
    <>
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
            Tambah Catatan Baru
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
                  <InputLabel outlined required>
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
                  <InputLabel outlined required>
                    Tugas di
                  </InputLabel>
                  <Select
                    required
                    value={gardenId}
                    onChange={onGardenIdChanged}
                    fullWidth
                    id="gardenId"
                    name="gardenId"
                    label="Tugas di "
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!canSave}
            >
              Tambah Catatan
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );

  return content;
};
export default NewNoteForm;

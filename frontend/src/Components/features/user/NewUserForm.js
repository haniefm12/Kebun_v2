import React from "react";
import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "../../../app/api/usersApiSlice";
import { Link, useNavigate } from "react-router-dom";
import { ROLES } from "../../../config/roles";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Copyright, ParkOutlined } from "@mui/icons-material";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;
const NAME_REGEX = /^[A-z\s]{3,20}$/;
const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [validName, setValidName] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState("Employee");

  useEffect(() => {
    setValidName(NAME_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/kelola-akun");
    }
  }, [isSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onNameChanged = (e) => setName(e.target.value);

  const onRolesChanged = (e) => {
    setRoles(e.target.value);
  };
  const canSave =
    [roles.length, validName, validUsername, validPassword].every(Boolean) &&
    !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ username, password, roles, name });
    }
  };
  const options = Object.values(ROLES).map((role) => {
    return (
      <MenuItem key={role} value={role}>
        {role}
      </MenuItem>
    );
  });

  const errClass = isError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validNameClass = !validName ? "form__input--incomplete" : "";
  const validPwdClass = !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !roles ? "form__input--incomplete" : "";

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
            <ParkOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Tambah Akun Baru
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={onSaveUserClicked}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  name="username"
                  type="text"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                  value={username}
                  onChange={onUsernameChanged}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  type="text"
                  value={name}
                  onChange={onNameChanged}
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  autoComplete="new-password"
                  value={password}
                  type="password"
                  onChange={onPasswordChanged}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="role">Role</InputLabel>
                  <Select
                    labelId="role"
                    fullWidth
                    required
                    label="Role"
                    id="roles"
                    name="roles"
                    value={roles}
                    onChange={onRolesChanged}
                  >
                    {options}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Buat Akun
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );

  return content;
};

export default NewUserForm;

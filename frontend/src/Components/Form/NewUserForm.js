import React, { useState, useEffect } from "react";

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
  IconButton,
  InputAdornment,
} from "@mui/material";
import { ParkOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { useAddNewUserMutation } from "../../app/api/usersApiSlice";
import { ROLES } from "../../config/roles";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;
const NAME_REGEX = /^[A-z\s]{3,20}$/;

const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess }] = useAddNewUserMutation();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [validName, setValidName] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [retypePassword, setRetypePassword] = useState("");
  const [validRetypePassword, setValidRetypePassword] = useState(false);
  const [roles, setRoles] = useState("employee");
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

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
    setValidRetypePassword(password === retypePassword);
  }, [password, retypePassword]);

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setUsername("");
      setPassword("");
      setRetypePassword("");
      setRoles([]);
      navigate("/kelola-akun");
    }
  }, [isSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onRetypePasswordChanged = (e) => setRetypePassword(e.target.value);
  const onNameChanged = (e) => setName(e.target.value);
  const onRolesChanged = (e) => {
    setRoles(e.target.value);
  };

  const canSave =
    [validName, validUsername, validPassword, validRetypePassword].every(
      Boolean
    ) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        await addNewUser({ username, password, roles, name });
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <MenuItem key={role} value={role}>
        {role}
      </MenuItem>
    );
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowRetypePassword = () => {
    setShowRetypePassword(!showRetypePassword);
  };

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
                  InputLabelProps={{ htmlFor: "username" }}
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
                  autoComplete="off"
                  InputLabelProps={{ htmlFor: "name" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  autoComplete="off"
                  value={password}
                  type={showPassword ? "text" : "password"}
                  onChange={onPasswordChanged}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{ htmlFor: "password" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="retype-password"
                  label="Retype Password"
                  name="retype-password"
                  autoComplete="off"
                  value={retypePassword}
                  type={showRetypePassword ? "text" : "password"}
                  onChange={onRetypePasswordChanged}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowRetypePassword}>
                          {showRetypePassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{ htmlFor: "retype-password" }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="role-label" htmlFor="roles">
                    Role
                  </InputLabel>
                  <Select
                    labelId="role-label"
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
              title="Save"
              disabled={!canSave}
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

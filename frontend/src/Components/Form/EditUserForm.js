import { useState, useEffect } from "react";
import { MuiTelInput } from "mui-tel-input";
import {
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../app/api/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import {
  EditNoteOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { REGEX } from "../../config/regex";

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, error }] = useUpdateUserMutation();

  const [deleteUser, { isSuccess: isDelSuccess, error: delerror }] =
    useDeleteUserMutation();

  const navigate = useNavigate();

  const [name, setName] = useState(user.name);
  const [image] = useState(user.image);
  const [validName, setValidName] = useState("");
  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [role, setRole] = useState(user.role);
  const [active, setActive] = useState(user.active);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setValidName(REGEX.NAME.test(name));
  }, [name]);

  useEffect(() => {
    setValidUsername(REGEX.USER.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(REGEX.PWD.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setUsername("");
      setPassword("");
      setRole("");
      setPhoneNumber("");
      navigate("/kelola-akun/");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onNameChanged = (e) => setName(e.target.value);
  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onPhoneNumberChanged = (value) => setPhoneNumber(value);
  const onRolesChanged = (e) => {
    setRole(e.target.value);
  };

  const onActiveChanged = () => setActive((prev) => !prev);

  const onSaveUserClicked = async (e) => {
    if (password) {
      await updateUser({
        id: user.id,
        name,
        username,
        phoneNumber,
        password,
        role,
        active,
        image,
      }).then((response) => {
        console.log(response);
      });
    } else {
      await updateUser({
        id: user.id,
        name,
        username,
        phoneNumber,
        role,
        active,
        image,
      }).then((response) => {
        console.log(response);
      });
    }
  };
  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
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

  let canSave;
  if (password) {
    canSave =
      [validUsername, validPassword, validName].every(Boolean) && !isLoading;
  } else {
    canSave = [validUsername, validName].every(Boolean) && !isLoading;
  }

  const errContent = error?.data?.message || delerror?.data?.message;

  const content = (
    <>
      <p>{errContent}</p>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        ></Box>
        <Avatar
          sx={{
            m: 1,
            bgcolor: "primary.main",
          }}
        >
          <EditNoteOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit Akun
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={(e) => e.preventDefault()}
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
              <MuiTelInput
                type="text"
                value={phoneNumber}
                onChange={onPhoneNumberChanged}
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                autoComplete="off"
                InputLabelProps={{ htmlFor: "phoneNumber" }}
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
                  value={role}
                  onChange={onRolesChanged}
                >
                  {options}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <FormControlLabel
            control={<Switch checked={active} onChange={onActiveChanged} />}
            label="Status Akun"
            id="user-active"
            name="user-active"
          ></FormControlLabel>

          <Button
            type="submit"
            fullWidth
            title="Save"
            disabled={!canSave}
            variant="contained"
            onClick={onSaveUserClicked}
            sx={{ mt: 3, mb: 2 }}
          >
            Ubah Akun
          </Button>
          <Button
            type="submit"
            fullWidth
            title="Save"
            onClick={onDeleteUserClicked}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Hapus Akun
          </Button>
        </Box>
      </Container>
    </>
  );

  return content;
};

export default EditUserForm;

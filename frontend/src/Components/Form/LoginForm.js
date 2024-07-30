import {
  Box,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import React from "react";

const LoginForm = ({
  username,
  password,
  handleUserInput,
  handlePwdInput,
  handleSubmit,
  handleToggle,
  persist,
  errMsg,
  userRef,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
        onChange={handleUserInput}
        value={username}
        ref={userRef}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        id="password"
        autoComplete="off"
        onChange={handlePwdInput}
        value={password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleTogglePasswordVisibility}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <FormControlLabel
        control={
          <Checkbox
            id="persist"
            onChange={handleToggle}
            checked={persist}
            value="persist"
            color="primary"
          />
        }
        label="Remember me"
      />
      {errMsg && (
        <div>
          <Alert severity="error">{errMsg}</Alert>
        </div>
      )}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
    </Box>
  );
};

export default LoginForm;

import { useRef, useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../app/api/authSlice";
import { useLoginMutation } from "../app/api/authApiSlice";
import usePersist from "../hooks/usePersist";
import LoadingState from "../Components/state/LoadingState";
import { Container, CssBaseline, Box, Avatar, Typography } from "@mui/material";
import LoginForm from "../Components/Form/LoginForm";
import LockOpenOutlined from "@mui/icons-material/LockOpenOutlined";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [username, password]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dashboard");
    } catch (err) {
      if (!err.status) {
        setErrMsg("Server tidak ada respon!");
      } else if (err.status === 400) {
        setErrMsg("Lengkapi Username or Password!");
      } else if (err.status === 401) {
        setErrMsg("Username atau password tidak valid!");
      } else {
        setErrMsg(err.data?.message);
      }
      if (errRef.current) {
        errRef.current.focus();
      }
    }
  };
  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);
  if (isLoading) return <LoadingState />;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOpenOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <LoginForm
          username={username}
          password={password}
          handleUserInput={handleUserInput}
          handlePwdInput={handlePwdInput}
          handleSubmit={handleSubmit}
          handleToggle={handleToggle}
          persist={persist}
          errMsg={errMsg}
          userRef={userRef}
        />
      </Box>
    </Container>
  );
};
export default Login;

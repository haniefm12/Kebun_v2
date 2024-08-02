import { useState, useEffect } from "react";
import { MuiTelInput } from "mui-tel-input";
import { useUpdateUserMutation } from "../../app/api/usersApiSlice";
import { useNavigate } from "react-router-dom";
import React from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import {
  EditNoteOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  doSomethingWithPhoto,
  getSignature,
  uploadImageToCloudinary,
} from "../../app/api/imageUpload";
import { CLOUDINARY_URL } from "../../config/urls";
import { REGEX } from "../../config/regex";

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();
  const navigate = useNavigate();
  const [name, setName] = useState(user.name);
  const [image, setImage] = useState(user.image);
  const [validName, setValidName] = useState("");
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [showPassword, setShowPassword] = useState(false);
  const [load, setLoad] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [validImage, setValidImage] = useState(false);
  const [filename, setFilename] = useState("");
  const [pageRefresh, setPageRefresh] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [imageUrl, setImageUrl] = useState(user.image);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage(
        "Image size exceeds 10MB. Please upload a smaller image."
      );
      setOpen(true);
      setImageUrl(URL.createObjectURL(file));
      setFilename(file.name);
      return;
    }
    setImage(file);
    setImageUrl(URL.createObjectURL(file));
    setErrorMessage("");
    setFilename(file.name);
    setOpen(false);
  };
  useEffect(() => {
    if (pageRefresh) {
      window.location.reload();
    }
  }, [pageRefresh]);
  useEffect(() => {
    if (isError) {
      setCountdown(10);
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      setTimeout(() => {
        clearInterval(countdownInterval);
        setPageRefresh(true);
      }, 11000);
    }
  }, [isError]);
  useEffect(() => {
    if (image) {
      const file = image;
      if (file.size <= 10 * 1024 * 1024) {
        setValidImage(true);
      } else {
        setValidImage(false);
      }
    }
  }, [image]);
  useEffect(() => {
    setValidName(REGEX.NAME.test(name));
  }, [name]);
  useEffect(() => {
    setValidPassword(REGEX.PWD.test(password));
  }, [password]);
  useEffect(() => {
    if (isSuccess) {
      setPassword("");
      setImage(null);
      setImageUrl("");
      setPhoneNumber("");
      navigate("/dashboard/");
    }
  }, [isSuccess, navigate]);
  const onNameChanged = (e) => setName(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onPhoneNumberChanged = (value) => setPhoneNumber(value);
  let canSave;
  if (password === "" && filename === "") {
    canSave = [validName].every(Boolean) && !isLoading;
  } else if (password === "") {
    canSave = [validName, validImage].every(Boolean) && !isLoading;
  } else if (filename === "") {
    canSave = [validPassword, validName].every(Boolean) && !isLoading;
  } else {
    canSave =
      [validPassword, validName, validImage].every(Boolean) && !isLoading;
  }
  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      const signatureResponse = await getSignature();
      if (canSave) {
        if (password !== "") {
          const data = new FormData();
          data.append("file", image);
          data.append("api_key", CLOUDINARY_URL.KEY);
          data.append("signature", signatureResponse.signature);
          data.append("timestamp", signatureResponse.timestamp);
          let imageHttps;

          const onUploadProgress = (e) => {
            const percentage = Math.round((e.loaded / e.total) * 100);
            setUploadProgress(percentage);
          };
          const cloudinaryResponse = await uploadImageToCloudinary(
            data,
            onUploadProgress
          );
          const photoData = {
            public_id: cloudinaryResponse.public_id,
            version: cloudinaryResponse.version,
            signature: cloudinaryResponse.signature,
            secure_url: cloudinaryResponse.secure_url,
          };
          const response = await doSomethingWithPhoto(photoData);
          if (filename !== "") {
            imageHttps = user.image;
          } else {
            imageHttps = response.imageHttps;
          }
          await updateUser({
            id: user.id,
            name,
            username: user.username,
            phoneNumber,
            password,
            role: user.role,
            active: user.active,
            image: imageHttps,
          });
        } else if (password) {
          await updateUser({
            id: user.id,
            name,
            username: user.username,
            phoneNumber,
            password,
            role: user.role,
            active: user.active,
            image: user.image,
          });
        } else {
          const data = new FormData();
          data.append("file", image);
          data.append("api_key", CLOUDINARY_URL.KEY);
          data.append("signature", signatureResponse.signature);
          data.append("timestamp", signatureResponse.timestamp);
          let imageHttps;
          const onUploadProgress = (e) => {
            const percentage = Math.round((e.loaded / e.total) * 100);
            setUploadProgress(percentage);
          };
          const cloudinaryResponse = await uploadImageToCloudinary(
            data,
            onUploadProgress
          );
          const photoData = {
            public_id: cloudinaryResponse.public_id,
            version: cloudinaryResponse.version,
            signature: cloudinaryResponse.signature,
            secure_url: cloudinaryResponse.secure_url,
          };
          const response = await doSomethingWithPhoto(photoData);
          if (filename === "") {
            imageHttps = user.image;
          } else {
            imageHttps = response.imageHttps;
          }
          await updateUser({
            id: user.id,
            name,
            username: user.username,
            phoneNumber,
            role: user.role,
            active: user.active,
            image: imageHttps,
          });
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const errContent = error?.data?.message;
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
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: "primary.main",
            }}
          >
            <EditNoteOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit Profile
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
                <Button
                  sx={{ mb: 1 }}
                  variant="contained"
                  component="label"
                  htmlFor="image-upload"
                  onChange={handleImageChange}
                >
                  ganti gambar
                  <input
                    accept="image/*"
                    type="file"
                    id="image-upload"
                    hidden
                  />
                </Button>
                {filename && (
                  <>
                    <br />
                    <Typography color="primary" variant="caption">
                      Nama File : {filename}
                    </Typography>
                  </>
                )}
                {imageUrl && (
                  <CardMedia
                    component="img"
                    image={imageUrl}
                    alt=""
                    sx={{
                      maxWidth: "100%",
                      margin: "0 auto",
                      height: "auto",
                      display: "block",
                      objectFit: "contain",
                      border: `1px solid skyblue`,
                      borderRadius: "5px",
                    }}
                  />
                )}
              </Grid>
            </Grid>
            {load ? (
              <>
                <LinearProgress
                  variant="determinate"
                  value={uploadProgress}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: "#eee",
                    "&.MuiLinearProgress-bar": {
                      backgroundColor: "#33b5e5",
                    },
                  }}
                />
                <Typography variant="caption" color="inherit">
                  {uploadProgress === 100
                    ? "Uploaded!"
                    : `Loading... ${uploadProgress}%`}
                </Typography>
              </>
            ) : (
              <>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!canSave}
                >
                  Simpan Perubahan
                </Button>
              </>
            )}
            {(isError || open) && (
              <Alert severity="error" sx={{ width: "100%" }}>
                {isError
                  ? `Data tidak valid. Page will be refreshed in ${countdown}`
                  : errorMessage}
              </Alert>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
  return content;
};
export default EditUserForm;

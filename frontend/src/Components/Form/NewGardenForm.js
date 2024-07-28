import React, { useState, useEffect } from "react";
import { useAddNewGardenMutation } from "../../app/api/gardensApiSlice";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { ParkOutlined } from "@mui/icons-material";
import {
  doSomethingWithPhoto,
  getSignature,
  uploadImageToCloudinary,
} from "../../app/api/imageUpload";
import { CLOUDINARY_URL } from "../../config/urls";
import { REGEX } from "../../config/regex";

const NewGardenForm = () => {
  const [addNewGarden, { isLoading, isSuccess, isError }] =
    useAddNewGardenMutation();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [address, setAddress] = useState("");
  const [validAddress, setValidAddress] = useState(false);
  const [area, setArea] = useState("");
  const [validArea, setValidArea] = useState(false);
  const [description, setDescription] = useState("");
  const [validDescription, setValidDescription] = useState(false);
  const [load, setLoad] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [validImage, setValidImage] = useState(false);
  const [filename, setFilename] = useState("");
  const [pageRefresh, setPageRefresh] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
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
    setValidDescription(REGEX.DESCRIPTION.test(description));
  }, [description]);

  useEffect(() => {
    setValidName(REGEX.GARDEN.test(name));
  }, [name]);

  useEffect(() => {
    setValidAddress(REGEX.ADDRESS.test(address));
  }, [address]);

  useEffect(() => {
    setValidArea(REGEX.AREA.test(area));
  }, [area]);

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setAddress("");
      setArea("");
      setImage(null);
      setImageUrl("");
      setDescription("");
      navigate("/kebun");
    }
  }, [isSuccess, navigate]);

  const onGardenNameChanged = (e) => setName(e.target.value);
  const onGardenAddressChanged = (e) => setAddress(e.target.value);
  const onGardenAreaChanged = (e) => setArea(e.target.value);
  const onGardenDescriptionChanged = (e) => setDescription(e.target.value);

  const canSave =
    [validName, validAddress, validArea, validDescription, validImage].every(
      Boolean
    ) && !isLoading;

  const onSaveGardenClicked = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      const signatureResponse = await getSignature();

      if (canSave) {
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
        imageHttps = response.imageHttps;
        await addNewGarden({
          name,
          address,
          area,
          description,
          image: imageHttps,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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
            Tambah Kebun Baru
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={onSaveGardenClicked}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  name="gardenName"
                  type="text"
                  required
                  fullWidth
                  id="gardenName"
                  label="Nama Kebun"
                  autoFocus
                  value={name}
                  onChange={onGardenNameChanged}
                  InputLabelProps={{ htmlFor: "gardenName" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  type="text"
                  value={address}
                  onChange={onGardenAddressChanged}
                  fullWidth
                  id="gardenAddress"
                  label="Alamat Kebun"
                  name="gardenAddress"
                  autoComplete="off"
                  InputLabelProps={{ htmlFor: "gardenAddress" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  type="number"
                  value={area}
                  onChange={onGardenAreaChanged}
                  fullWidth
                  id="gardenArea"
                  label="Luas Kebun (m²)"
                  name="gardenArea"
                  autoComplete="off"
                  InputLabelProps={{ htmlFor: "gardenArea" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  value={description}
                  onChange={onGardenDescriptionChanged}
                  fullWidth
                  id="gardenDescription"
                  label="Deskripsi Kebun"
                  name="gardenDescription"
                  autoComplete="off"
                  InputLabelProps={{ htmlFor: "gardenDescription" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  component="label"
                  htmlFor="image-upload"
                  onChange={handleImageChange}
                >
                  pilih gambar
                  <input
                    accept="image/*"
                    type="file"
                    id="image-upload"
                    hidden
                  />
                </Button>
                {filename && (
                  <Typography variant="body1">{filename}</Typography>
                )}
                {imageUrl && (
                  <div
                    style={{
                      marginLeft: "60px",
                      width: "70%",
                      height: "200px",
                      backgroundImage: `url(${imageUrl})`,
                      backgroundSize: "100% 100%",
                      backgroundPosition: "center",
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!canSave}
              >
                Tambah Kebun
              </Button>
            )}{" "}
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

export default NewGardenForm;

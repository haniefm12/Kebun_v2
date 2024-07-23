import React, { useState, useEffect } from "react";
import {
  useAddNewGardenMutation,
  useDeleteGardenMutation,
  useUpdateGardenMutation,
} from "../../../app/api/gardensApiSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  LinearProgress,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { ParkOutlined } from "@mui/icons-material";
import axios from "axios";

const api_key = "989773282234796";
const cloud_name = "kebunv2";

const GARDEN_NAME_REGEX = /^[A-z\s\d]{3,50}$/;
const GARDEN_ADDRESS_REGEX = /^[A-z\s\d,\.]{3,100}$/;
const GARDEN_AREA_REGEX = /^\d+(\.\d+)?$/;
const GARDEN_DESCRIPTION_REGEX = /^[A-z\s\d,.\-]{3,500}$/;
const EditGardenForm = ({ garden }) => {
  const [updateGarden, { isLoading, isSuccess, isError, error }] =
    useUpdateGardenMutation();

  const [
    deleteGarden,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteGardenMutation();

  const navigate = useNavigate();

  const [name, setName] = useState(garden.name);
  const [validName, setValidName] = useState(false);
  const [address, setAddress] = useState(garden.address);
  const [validAddress, setValidAddress] = useState(false);
  const [area, setArea] = useState(garden.area);
  const [validArea, setValidArea] = useState(false);
  const [description, setDescription] = useState(garden.description);
  const [validDescription, setValidDescription] = useState(false);
  const [load, setLoad] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [validImage, setValidImage] = useState(false);
  const [filename, setFilename] = useState("");
  const [pageRefresh, setPageRefresh] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const [image, setImage] = useState(garden.image);
  const [imageUrl, setImageUrl] = useState(garden.image);
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
    setValidDescription(GARDEN_DESCRIPTION_REGEX.test(description));
  }, [description]);

  useEffect(() => {
    setValidName(GARDEN_NAME_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidAddress(GARDEN_ADDRESS_REGEX.test(address));
  }, [address]);

  useEffect(() => {
    setValidArea(GARDEN_AREA_REGEX.test(area));
  }, [area]);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setName("");
      setAddress("");
      setArea("");
      setImage(null);
      setImageUrl("");
      setDescription("");
      navigate("/kebun");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onGardenNameChanged = (e) => setName(e.target.value);
  const onGardenAddressChanged = (e) => setAddress(e.target.value);
  const onGardenAreaChanged = (e) => setArea(e.target.value);
  const onGardenDescriptionChanged = (e) => setDescription(e.target.value);

  const canSave =
    [validName, validAddress, validArea, validDescription].every(Boolean) &&
    !isLoading;
  const onDeleteGardenClicked = async () => {
    await deleteGarden({ id: garden.id });
  };

  const onSaveGardenClicked = async (e) => {
    e.preventDefault();
    setLoad(true);
    const signatureResponse = await axios.get(
      "http://localhost:3500/get-signature"
    );
    if (canSave) {
      try {
        const data = new FormData();
        data.append("file", image);
        data.append("api_key", api_key);
        data.append("signature", signatureResponse.data.signature);
        data.append("timestamp", signatureResponse.data.timestamp);
        let imageHttps;
        const cloudinaryResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`,
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: function (e) {
              const percentage = Math.round((e.loaded / e.total) * 100);
              setUploadProgress(percentage);
            },
          }
        );
        console.log(cloudinaryResponse.data);
        const photoData = {
          public_id: cloudinaryResponse.data.public_id,
          version: cloudinaryResponse.data.version,
          signature: cloudinaryResponse.data.signature,
          secure_url: cloudinaryResponse.data.secure_url,
        };
        await axios
          .post("http://localhost:3500/do-something-with-photo", photoData)
          .then((response) => {
            const imageID = response.data.imageID;
            imageHttps = response.data.imageHttps;
            console.log(`Image ID: ${imageID}`);
            console.log(`Image HTTPS: ${imageHttps}`);
            // You can use the imageID here
          })
          .catch((error) => {
            console.error(error);
          });
        console.log(imageHttps);
        await updateGarden({
          id: garden.id,
          name,
          address,
          area,
          description,
          image: imageHttps,
          status: true,
        });
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };
  // ... (rest of the code remains the same)

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
            Ubah Data Kebun
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
                  ganti gambar
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
              <>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!canSave}
                >
                  Simpan Perubahan Data Kebun
                </Button>
                <Button
                  type="submit"
                  fullWidth
                  title="Save"
                  //   disabled={!canSave}
                  onClick={onDeleteGardenClicked}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Hapus Data Kebun
                </Button>
              </>
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

export default EditGardenForm;

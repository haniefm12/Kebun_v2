import React, { useState, useEffect } from "react";
import { useAddNewGardenMutation } from "../../../app/api/gardensApiSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Description, ParkOutlined } from "@mui/icons-material";

const GARDEN_NAME_REGEX = /^[A-z\s]{3,50}$/;
const GARDEN_ADDRESS_REGEX = /^[A-z\s,\.]{3,100}$/;
const GARDEN_AREA_REGEX = /^\d+(\.\d+)?$/;

const NewGardenForm = () => {
  const [addNewGarden, { isLoading, isSuccess, isError, error }] =
    useAddNewGardenMutation();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [address, setAddress] = useState("");
  const [validAddress, setValidAddress] = useState(false);
  const [area, setArea] = useState("");
  const [validArea, setValidArea] = useState(false);
  const [description, setDescription] = useState("");

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
    if (isSuccess) {
      setName("");
      setAddress("");
      setArea("");
      setDescription("");
      navigate("/kebun");
    }
  }, [isSuccess, navigate]);

  const onGardenNameChanged = (e) => setName(e.target.value);
  const onGardenAddressChanged = (e) => setAddress(e.target.value);
  const onGardenAreaChanged = (e) => setArea(e.target.value);
  const onGardenDescriptionChanged = (e) => setDescription(e.target.value);

  const canSave =
    [validName, validAddress, validArea].every(Boolean) && !isLoading;

  const onSaveGardenClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        await addNewGarden({
          name,
          address,
          area,
          description,
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!canSave}
            >
              Tambah Kebun
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );

  return content;
};

export default NewGardenForm;

import React, { useState, useEffect } from "react";
import { useAddNewInventoryMutation } from "../../app/api/inventorysApiSlice";
import { useGetGardensQuery } from "../../app/api/gardensApiSlice";
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
} from "@mui/material";
import { Inventory2 } from "@mui/icons-material";
import { REGEX } from "../../config/regex";
import LoadingState from "../state/LoadingState";

const categories = [
  { value: "Bibit dan Biji", label: "Bibit dan Biji" },
  { value: "Peralatan Berkebun", label: "Peralatan Berkebun" },
  { value: "Pupuk dan Kompos", label: "Pupuk dan Kompos" },
  { value: "Obat dan Kontrol Hama", label: "Obat dan Kontrol Hama" },
  { value: "Irigasi dan Penyiraman", label: "Irigasi dan Penyiraman" },
  { value: "Tanah", label: "Tanah" },
  {
    value: "Dekorasi dan Aksesori Kebun",
    label: "Dekorasi dan Aksesori Kebun",
  },
];

const NewInventoryForm = () => {
  const [addNewInventory, { isLoading, isSuccess }] =
    useAddNewInventoryMutation();
  const navigate = useNavigate();

  const { gardens, isLoading: isGardensLoading } = useGetGardensQuery(
    "gardensList",
    {
      selectFromResult: ({ data }) => ({
        gardens: data?.ids.map((id) => data?.entities[id]),
      }),
    }
  );

  const [gardenId, setGardenId] = useState("");
  const [item, setItem] = useState("");
  const [validItem, setValidItem] = useState(false);
  const [itemType, setItemType] = useState("");
  const [validItemType, setValidItemType] = useState(false);
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    setValidItem(REGEX.ITEM.test(item));
  }, [item]);

  useEffect(() => {
    setValidItemType(REGEX.ITEM.test(itemType));
  }, [itemType]);

  useEffect(() => {
    if (isSuccess) {
      setGardenId("");
      setItem("");
      setItemType("");
      setQuantity("");
      navigate("/inventaris");
    }
  }, [isSuccess, navigate]);

  const onGardenIdChanged = (e) => setGardenId(e.target.value);
  const onItemChanged = (e) => setItem(e.target.value);
  const onItemTypeChanged = (e) => setItemType(e.target.value);
  const onQuantityChanged = (e) => setQuantity(e.target.value);

  const canSave = [validItem, validItemType].every(Boolean) && !isLoading;

  const onSaveInventoryClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        await addNewInventory({
          garden: gardenId,
          itemType,
          item,
          quantity,
        });
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  if (isGardensLoading) {
    return <LoadingState />;
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
            <Inventory2 />
          </Avatar>
          <Typography component="h1" variant="h5">
            Tambah Barang Baru
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={onSaveInventoryClicked}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel outlined required>
                    Barang di
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
                  value={item}
                  onChange={onItemChanged}
                  fullWidth
                  id="item"
                  label="Nama Barang"
                  name="item"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  type="number"
                  value={quantity}
                  onChange={onQuantityChanged}
                  fullWidth
                  id="quantity"
                  label="Jumlah Barang"
                  name="quantity"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel outlined required>
                    Tipe Barang
                  </InputLabel>
                  <Select
                    required
                    value={itemType}
                    onChange={onItemTypeChanged}
                    fullWidth
                    id="itemType"
                    name="ItemType"
                    label="tipe Barang"
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.value} value={category.value}>
                        {category.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!canSave}
            >
              Tambah Barang
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );

  return content;
};
export default NewInventoryForm;

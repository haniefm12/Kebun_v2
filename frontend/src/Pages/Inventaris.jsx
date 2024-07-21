import React from "react";
import { useGetInventorysQuery } from "../app/api/inventorysApiSlice";
import Inventory from "../Components/features/inventory/Inventory";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Fab,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";

const Inventaris = () => {
  const navigate = useNavigate();
  const {
    data: inventorys,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetInventorysQuery("inventoryList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <Typography>Loading...</Typography>;

  if (isError) {
    content = (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <Typography variant="h5" color="error" align="center">
            {error?.data?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} pt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/inventaris/new")}
          >
            Tambah Inventaris
          </Button>
        </Grid>
      </Grid>
    );
  }

  if (isSuccess) {
    const { ids } = inventorys;

    const tableContent = ids?.length
      ? ids.map((inventoryId, index) => (
          <Inventory
            key={inventoryId}
            inventoryId={inventoryId}
            serialNumber={index + 1}
          />
        ))
      : null;

    content = (
      <Box pl={4} pb={2} pt={2} pr={2}>
        <Typography pl={2} pb={1} variant="h4">
          Inventaris
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 580 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell width={5}>No.</TableCell>
                <TableCell align="left">Nama Kebun</TableCell>
                <TableCell align="left">Nama Barang</TableCell>
                <TableCell align="left">Tipe Barang</TableCell>
                <TableCell align="left">Jumlah Barang</TableCell>
                <TableCell align="left">Tanggal Barang Masuk</TableCell>
                <TableCell align="left">Tanggal Diperbaharui</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{tableContent}</TableBody>
          </Table>
        </TableContainer>
        <Fab
          color="primary"
          size="large"
          sx={{
            position: "absolute",
            bottom: 35,
            right: 35,
          }}
          onClick={() => navigate("/inventaris/new")}
        >
          <AddIcon />
        </Fab>
      </Box>
    );
  }

  return content;
};
export default Inventaris;

import React from "react";
import { useGetFinancesQuery } from "../app/api/financesApiSlice";
import Finance from "../Components/features/finance/Finance";
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
    data: finances,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetFinancesQuery("financeList", {
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
            onClick={() => navigate("/keuangan/new")}
          >
            Tambah Transaksi
          </Button>
        </Grid>
      </Grid>
    );
  }

  if (isSuccess) {
    const { ids } = finances;
    const tableContent = ids?.map((financeId, index) => (
      <Finance key={financeId} financeId={financeId} serialNumber={index + 1} />
    ));

    const totalExpenses = ids?.reduce((acc, financeId) => {
      console.log("finance", finances.entities[financeId]);
      console.log(
        "totalCost",
        finances.entities[financeId]?.finance?.totalCost
      );
      return acc + (finances.entities[financeId]?.totalCost || 0);
    }, 0);
    console.log("ids", ids);
    console.log("finances.entities", finances.entities);

    content = (
      <Box pl={4} pb={2} pt={2} pr={2}>
        <Typography pl={2} pb={0} variant="h4">
          Keuangan
        </Typography>
        <Typography variant="h6" sx={{ mt: 0, textAlign: "right" }}>
          Total Pengeluaran: Rp. {totalExpenses.toLocaleString("id-ID")},-
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 580 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell width={5}>No.</TableCell>
                <TableCell align="left">Supplier</TableCell>
                <TableCell align="left">Nama Barang</TableCell>
                <TableCell align="left">Tipe Barang</TableCell>
                <TableCell align="left">Jumlah Barang</TableCell>
                <TableCell align="left">Harga Satuan</TableCell>
                <TableCell align="left">Jumlah Harga</TableCell>
                <TableCell align="left">Nama Kebun</TableCell>
                <TableCell align="left">Tanggal</TableCell>
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
          onClick={() => navigate("/keuangan/new")}
        >
          <AddIcon />
        </Fab>
      </Box>
    );
  }

  return content;
};
export default Inventaris;

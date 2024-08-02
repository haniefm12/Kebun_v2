import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Finance from "../features/finance/Finance";

const FinanceTable = ({ finances }) => {
  const { ids } = finances;
  const tableContent = ids?.map((financeId, index) => (
    <Finance key={financeId} financeId={financeId} serialNumber={index + 1} />
  ));
  return (
    <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
      <Table
        sx={{ minWidth: 580, tableLayout: "fixed" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "5%" }}>No.</TableCell>
            <TableCell align="left" sx={{ width: "10%" }}>
              Supplier
            </TableCell>
            <TableCell align="left" sx={{ width: "15%" }}>
              Nama Barang
            </TableCell>
            <TableCell align="left" sx={{ width: "10%" }}>
              Tipe Barang
            </TableCell>
            <TableCell align="left" sx={{ width: "10%" }}>
              Jumlah Barang
            </TableCell>
            <TableCell align="left" sx={{ width: "10%" }}>
              Harga Satuan
            </TableCell>
            <TableCell align="left" sx={{ width: "10%" }}>
              Jumlah Harga
            </TableCell>
            <TableCell align="left" sx={{ width: "15%" }}>
              Nama Kebun
            </TableCell>
            <TableCell align="left" sx={{ width: "10%" }}>
              Tanggal
            </TableCell>
            <TableCell align="center" sx={{ width: "10%" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{tableContent}</TableBody>
      </Table>
    </TableContainer>
  );
};
export default FinanceTable;

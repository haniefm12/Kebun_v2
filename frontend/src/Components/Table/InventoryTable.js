import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Inventory from "../features/inventory/Inventory";

const InventoryTable = ({ inventorys, auth }) => {
  const { ids } = inventorys;
  let action;
  if (auth === true) {
    action = <TableCell align="center">Actions</TableCell>;
  } else {
    action = null;
  }
  const tableContent = ids?.map((inventoryId, index) => (
    <Inventory
      auth={auth}
      key={inventoryId}
      inventoryId={inventoryId}
      serialNumber={index + 1}
    />
  ));
  return (
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
            {action}
          </TableRow>
        </TableHead>
        <TableBody>{tableContent}</TableBody>
      </Table>
    </TableContainer>
  );
};
export default InventoryTable;

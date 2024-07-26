// components/Table.js
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import User from "../features/user/User";

const UserTable = ({ users }) => {
  const { ids } = users;
  const tableContent = ids?.map((userId, index) => (
    <User key={userId} userId={userId} serialNumber={index + 1} />
  ));

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 580 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width={5}>No.</TableCell>
            <TableCell align="center">Username</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Role</TableCell>
            <TableCell align="center">Phone Number</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{tableContent}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;

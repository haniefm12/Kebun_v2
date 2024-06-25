import React from "react";
import { useGetUsersQuery } from "../app/api/usersApiSlice";
import User from "../Components/features/User";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { caption } from "@mui/material/Table";

const KelolaAkun = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = (
      <Box variant="h1" className="errmsg">
        {error?.data?.message}
      </Box>
    );
  }

  if (isSuccess) {
    const { ids } = users;

    const tableContent = ids?.length
      ? ids.map((userId, index) => (
          <User key={userId} userId={userId} serialNumber={index + 1} />
        ))
      : null;

    content = (
      <Box p={2}>
        <Typography pl={2} pb={1} variant="h4">
          Daftar Akun
        </Typography>
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
      </Box>
    );
  }

  return content;
};
export default KelolaAkun;

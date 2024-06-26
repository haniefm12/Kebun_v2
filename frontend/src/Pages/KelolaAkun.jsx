import React from "react";
import { useGetUsersQuery } from "../app/api/usersApiSlice";
import User from "../Components/features/user/User";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Fab,
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

const KelolaAkun = () => {
  const navigate = useNavigate();
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("userList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <Typography>Loading...</Typography>;

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
      <Box pl={4} pb={2} pt={2} pr={2}>
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
        <Fab
          color="primary"
          size="large"
          sx={{
            position: "absolute",
            bottom: 35,
            right: 35,
          }}
          onClick={() => navigate("/kelola-akun/new")}
        >
          <AddIcon />
        </Fab>
      </Box>
    );
  }

  return content;
};
export default KelolaAkun;

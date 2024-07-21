import React from "react";
import { useGetUsersQuery } from "../app/api/usersApiSlice";
import User from "../Components/features/user/User";
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
            onClick={() => navigate("/kelola-akun/new")}
          >
            Tambah Akun
          </Button>
        </Grid>
      </Grid>
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

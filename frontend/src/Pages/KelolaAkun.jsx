import React from "react";
import { Box, Typography } from "@mui/material";
import LoadingState from "../Components/state/LoadingState";
import ErrorNoData from "../Components/state/ErrorNoData";
import NewData from "../Components/FloatButton/NewData";
import { useUsers } from "../app/api/api";
import UserTable from "../Components/Table/UserTable";

const KelolaAkun = () => {
  const { data: users, isLoading, isError, error } = useUsers();
  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorNoData error={error} />;
  return (
    <Box pl={4} pb={2} pt={2} pr={2}>
      <Typography pl={2} pb={1} variant="h4">
        Kelola Akun
      </Typography>
      <UserTable users={users} />
      <NewData />
    </Box>
  );
};
export default KelolaAkun;

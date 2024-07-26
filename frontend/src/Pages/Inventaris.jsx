import React from "react";
import { Box, Typography } from "@mui/material";
import NewData from "../Components/FloatButton/NewData";

import { useInventorys } from "../app/api/api";
import LoadingState from "../Components/state/LoadingState";
import ErrorNoData from "../Components/state/ErrorNoData";
import InventoryTable from "../Components/Table/InventoryTable";

const Inventaris = () => {
  const { data: inventorys, isLoading, isError, error } = useInventorys();

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return <ErrorNoData error={error} />;
  }

  return (
    <Box pl={4} pb={2} pt={2} pr={2}>
      <Typography pl={2} pb={1} variant="h4">
        Inventaris
      </Typography>
      <InventoryTable inventorys={inventorys} />
      <NewData />
    </Box>
  );
};

export default Inventaris;

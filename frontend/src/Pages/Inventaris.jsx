import React, { useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  Stack,
} from "@mui/material";
import NewData from "../Components/FloatButton/NewData";
import { useGardens, useInventorys } from "../app/api/api";
import LoadingState from "../Components/state/LoadingState";
import ErrorNoData from "../Components/state/ErrorNoData";
import InventoryTable from "../Components/Table/InventoryTable";
import useAuth from "../hooks/useAuth";

const Inventaris = () => {
  const { data: inventorys, isLoading, isError, error } = useInventorys();
  const { data: gardens } = useGardens();
  const { isManager, isAdmin } = useAuth();
  let tombolTambah;
  let auth;
  if (isManager || isAdmin) {
    tombolTambah = <NewData />;
    auth = true;
  } else {
    tombolTambah = null;
    auth = false;
  }

  const [filteredGarden, setFilteredGarden] = useState("");
  const [filteredItemType, setFilteredItemType] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleGardenChange = (event) => {
    setFilteredGarden(event.target.value);
  };

  const handleItemTypeChange = (event) => {
    setFilteredItemType(event.target.value);
  };

  const handleClearFilters = () => {
    setFilteredGarden("");
    setFilteredItemType("");
  };

  const getFilteredInventorys = () => {
    let filteredInventorys = inventorys.ids;

    if (filteredGarden) {
      filteredInventorys = filteredInventorys.filter(
        (inventoryId) =>
          inventorys.entities[inventoryId].garden === filteredGarden
      );
    }
    if (filteredItemType) {
      filteredInventorys = filteredInventorys.filter(
        (inventoryId) =>
          inventorys.entities[inventoryId].itemType === filteredItemType
      );
    }

    return filteredInventorys.map(
      (inventoryId) => inventorys.entities[inventoryId]
    );
  };

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
      <Button onClick={handleToggleFilters}>
        {showFilters ? "Hide Filters" : "Show Filters"}
      </Button>
      {showFilters && (
        <Stack direction="row" spacing={2} sx={{ mt: 0, ml: 0, mb: 2 }}>
          <Select value={filteredGarden} onChange={handleGardenChange}>
            <MenuItem value="">All Gardens</MenuItem>
            {Array.from(
              new Set(
                inventorys.ids.map(
                  (inventoryId) => inventorys.entities[inventoryId].garden
                )
              )
            ).map((gardenId) => {
              const garden = gardens.entities[gardenId];
              return (
                <MenuItem key={gardenId} value={gardenId}>
                  {garden.name}
                </MenuItem>
              );
            })}
          </Select>
          <Select value={filteredItemType} onChange={handleItemTypeChange}>
            <MenuItem value="">All Item Types</MenuItem>
            {Array.from(
              new Set(
                inventorys.ids.map(
                  (inventoryId) => inventorys.entities[inventoryId].itemType
                )
              )
            ).map((itemType) => (
              <MenuItem key={itemType} value={itemType}>
                {itemType}
              </MenuItem>
            ))}
          </Select>
          <Button onClick={handleClearFilters}>Clear Filters</Button>
        </Stack>
      )}
      <InventoryTable inventorys={getFilteredInventorys()} auth={auth} />
      {tombolTambah}
    </Box>
  );
};

export default Inventaris;

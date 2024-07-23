import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Box, CircularProgress } from "@mui/material";
import { selectInventoryById } from "../../../app/api/inventorysApiSlice";

import EditInventoryForm from "./EditInventoryForm";

const EditInventory = () => {
  const { id } = useParams();

  const inventory = useSelector((state) => selectInventoryById(state, id));

  const content = inventory ? (
    <EditInventoryForm inventory={inventory} />
  ) : (
    <Box sx={{ display: "flex", marginTop: 8, alignItems: "center" }}>
      <CircularProgress />
    </Box>
  );

  return content;
};
export default EditInventory;

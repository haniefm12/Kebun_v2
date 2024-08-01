import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectInventoryById } from "../../../app/api/inventorysApiSlice";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { IconButton, TableCell, TableRow } from "@mui/material";
import { selectGardenById } from "../../../app/api/gardensApiSlice";
import React from "react";
import { formatDateTime } from "../../../utils/formatDateTime";

const Inventory = ({ inventoryId, serialNumber }) => {
  const inventory = useSelector((state) =>
    selectInventoryById(state, inventoryId)
  );
  const navigate = useNavigate();
  const gardenId = inventory ? inventory.garden : null; // Add a check for note
  const garden = useSelector((state) => selectGardenById(state, gardenId));

  if (inventory) {
    const handleEdit = () => navigate(`/inventaris/edit/${inventoryId}`);

    return (
      <TableRow>
        <TableCell sx={{ maxWidth: 10 }}>{serialNumber}</TableCell>
        <TableCell align="left">
          {garden ? garden.name : "Unknown garden"}
        </TableCell>
        <TableCell align="left">{inventory.item}</TableCell>
        <TableCell align="left">{inventory.itemType}</TableCell>
        <TableCell align="center">{inventory.quantity}</TableCell>
        <TableCell align="center">
          {formatDateTime(inventory.createdAt)}
        </TableCell>
        <TableCell align="center">
          {inventory.createdAt === inventory.updatedAt
            ? "-"
            : formatDateTime(inventory.updatedAt)}
        </TableCell>
        <TableCell align="center">
          <IconButton onClick={handleEdit}>
            <EditNoteIcon fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  } else return null;
};

export default Inventory;

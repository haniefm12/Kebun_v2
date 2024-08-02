import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFinanceById } from "../../../app/api/financesApiSlice";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { IconButton, TableCell, TableRow } from "@mui/material";
import { selectGardenById } from "../../../app/api/gardensApiSlice";
import { formatDateOnly } from "../../../utils/formatDateTime";
import React from "react";

const Finance = ({ financeId, serialNumber }) => {
  const finance = useSelector((state) => selectFinanceById(state, financeId));
  const navigate = useNavigate();
  const gardenId = finance ? finance.garden : null;
  const garden = useSelector((state) => selectGardenById(state, gardenId));
  if (finance) {
    const handleEdit = () => navigate(`/keuangan/edit/${financeId}`);
    return (
      <TableRow>
        <TableCell sx={{ maxWidth: 10 }}>{serialNumber}</TableCell>
        <TableCell align="left">{finance.supplier}</TableCell>
        <TableCell align="left">{finance.item}</TableCell>
        <TableCell align="left">{finance.itemType}</TableCell>
        <TableCell align="center">{finance.quantity}</TableCell>
        <TableCell align="right">
          <span style={{ float: "left" }}>Rp.</span>
          <span style={{ float: "right" }}>
            {finance.unitPrice.toLocaleString("id-ID")},-
          </span>
        </TableCell>
        <TableCell align="left">
          {" "}
          <span style={{ float: "left" }}>Rp.</span>
          <span style={{ float: "right" }}>
            {finance.totalCost.toLocaleString("id-ID")},-
          </span>
        </TableCell>
        <TableCell align="left">
          {garden ? garden.name : "Unknown garden"}
        </TableCell>
        <TableCell align="left">{formatDateOnly(finance.createdAt)}</TableCell>
        <TableCell align="center">
          <IconButton onClick={handleEdit}>
            <EditNoteIcon fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  } else return null;
};
export default Finance;

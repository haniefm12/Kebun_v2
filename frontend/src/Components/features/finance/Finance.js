import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFinanceById } from "../../../app/api/financesApiSlice";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { IconButton, TableCell, TableRow } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { selectGardenById } from "../../../app/api/gardensApiSlice";

const Finance = ({ financeId, serialNumber }) => {
  const finance = useSelector((state) => selectFinanceById(state, financeId));
  console.log(financeId);
  const navigate = useNavigate();
  const gardenId = finance ? finance.garden : null; // Add a check for note
  const garden = useSelector((state) => selectGardenById(state, gardenId));
  const formatDateTime = (date) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const dateObj = new Date(date);
    const month = monthNames[dateObj.getMonth()];
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const hour = dateObj.getHours();
    const minute = dateObj.getMinutes();
    return `${day} ${month} ${year} `;
  };

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
        <TableCell align="left">{formatDateTime(finance.createdAt)}</TableCell>
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

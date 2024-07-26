import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Box, CircularProgress } from "@mui/material";
import { selectFinanceById } from "../../../app/api/financesApiSlice";
import EditFinanceForm from "../../Form/EditFinanceForm";

const EditFinance = () => {
  const { id } = useParams();

  const finance = useSelector((state) => selectFinanceById(state, id));

  const content = finance ? (
    <EditFinanceForm finance={finance} />
  ) : (
    <Box sx={{ display: "flex", marginTop: 8, alignItems: "center" }}>
      <CircularProgress />
    </Box>
  );

  return content;
};
export default EditFinance;

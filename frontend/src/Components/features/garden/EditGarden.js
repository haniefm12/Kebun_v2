import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Box, CircularProgress } from "@mui/material";
import { selectGardenById } from "../../../app/api/gardensApiSlice";
import GardenPage from "./GardenPage";
import EditGardenForm from "./EditGardenForm";

const EditGarden = () => {
  const { id } = useParams();

  const garden = useSelector((state) => selectGardenById(state, id));

  const content = garden ? (
    <EditGardenForm garden={garden} />
  ) : (
    <Box sx={{ display: "flex", marginTop: 8, alignItems: "center" }}>
      <CircularProgress />
    </Box>
  );

  return content;
};
export default EditGarden;

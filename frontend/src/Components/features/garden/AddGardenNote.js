import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Box, CircularProgress } from "@mui/material";
import { selectGardenById } from "../../../app/api/gardensApiSlice";
import AddNewGardenNoteForm from "./AddGardenNoteForm";

const AddGardenNote = () => {
  const { id } = useParams();

  const garden = useSelector((state) => selectGardenById(state, id));

  const content = garden ? (
    <AddNewGardenNoteForm garden={garden} />
  ) : (
    <Box sx={{ display: "flex", marginTop: 8, alignItems: "center" }}>
      <CircularProgress />
    </Box>
  );

  return content;
};
export default AddGardenNote;

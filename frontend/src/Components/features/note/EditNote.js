import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectNoteById } from "../../../app/api/notesApiSlice";
import EditNoteForm from "./EditNoteForm";
import { Box, CircularProgress } from "@mui/material";

const EditNote = () => {
  const { id } = useParams();

  const note = useSelector((state) => selectNoteById(state, id));

  const content = note ? (
    <EditNoteForm note={note} />
  ) : (
    <Box sx={{ display: "flex", marginTop: 8, alignItems: "center" }}>
      <CircularProgress />
    </Box>
  );

  return content;
};
export default EditNote;

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { selectUserById } from "../../app/api/usersApiSlice";
import { selectGardenById } from "../../app/api/gardensApiSlice";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectNoteById } from "../../app/api/notesApiSlice";

export default function NoteCard({ noteId }) {
  const note = useSelector((state) => selectNoteById(state, noteId));
  const userId = note ? note.user : null; // Add a check for note
  const user = useSelector((state) => selectUserById(state, userId));
  const gardenId = note ? note.garden : null; // Add a check for note
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
    return `(${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")})  ${month} ${day}, ${year} `;
  };

  const navigate = useNavigate();
  const handleDetail = () => navigate(`/tugas/detail/${noteId}`);
  return (
    <Card
      sx={{
        maxWidth: {
          xs: 700,
          sm: 600,
          md: 500,
          xl: 400,
        },
      }}
    >
      <CardContent>
        {note && (
          <>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Tugas untuk {user ? user.name : "Unknown user"} di{" "}
              {garden ? garden.name : "Unknown garden"}
            </Typography>
            <Typography variant="h5" component="div">
              {note.title}
            </Typography>
            <Typography sx={{ mb: 1.5, fontSize: 13 }} color="text.secondary">
              {note.completed ? "status : selesai" : "status : belum selesai"}
            </Typography>
            <Typography variant="body2">{note.text}</Typography>
            <br></br>
            <Typography variant="caption">
              {formatDateTime(note.createdAt)}
            </Typography>
          </>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleDetail}>
          Lihat Detail
        </Button>
      </CardActions>
    </Card>
  );
}

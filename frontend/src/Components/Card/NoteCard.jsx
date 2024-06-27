import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { green } from "@mui/material/colors";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { AddBox, ArrowRight, Edit, OpenInNew, Park } from "@mui/icons-material";
import {
  Box,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectNoteById } from "../../app/api/notesApiSlice";
import { useEffect } from "react";
import { useGetNotesQuery } from "../../app/api/notesApiSlice";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function NoteCard(noteId) {
  const note = useSelector((state) => selectNoteById(state, noteId));

  const navigate = useNavigate();
  console.log(note);

  const handleEdit = () => navigate(`/dash/notes/${noteId}`);
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
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {/* {note.user.toString()} */}
        </Typography>
        <Typography variant="h5" component="div">
          {/* {note.title} */}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {/* {note.createdAt} */}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {/* {note.updatedAt} */}
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

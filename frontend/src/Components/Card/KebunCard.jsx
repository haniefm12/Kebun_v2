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
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectGardenById } from "../../app/api/gardensApiSlice";
import { useEffect } from "react";

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

export default function KebunCard({ gardenId }) {
  const [expanded, setExpanded] = useState(false);
  const garden = useSelector((state) => selectGardenById(state, gardenId));
  console.log(gardenId, garden);
  const [notes, setNotes] = useState([]);
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

  useEffect(() => {
    if (garden?.notes) {
      const notesArray = garden.notes.filter((note) => note.note && note.date);
      setNotes(notesArray);
    }
  }, [garden?.notes]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const hectare = garden?.area ? garden.area / 10000 : 0;
  let title = "";
  let subheader = "";
  let address = " ";
  let description = " ";
  if (garden) {
    title = garden.name;
    address = garden.address;
    description = garden.description;
    subheader = `${garden.area} m² (${garden.area / 10000} ha)`;
  }

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
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: green[300] }} aria-label="recipe">
            <Park></Park>
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <OpenInNew></OpenInNew>
          </IconButton>
        }
        title={title}
        subheader={subheader}
      />
      <CardMedia
        component="img"
        height="194"
        image="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/390px-No-Image-Placeholder.svg.png"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {address}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Edit />
        </IconButton>
        <IconButton aria-label="share">
          <AddBox />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Catatan:</Typography>

          <div>
            {garden && garden.notes && garden.notes.length > 0 ? (
              garden.notes.slice(1).map((note, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <ArrowRight /> {/* or any other icon you want */}
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body2">{note.note}</Typography>
                    <Typography variant="caption">
                      {formatDateTime(note.date)}
                    </Typography>
                  </ListItemText>
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText>
                  <Typography variant="body2">No notes available</Typography>
                </ListItemText>
              </ListItem>
            )}
          </div>
          <Typography paragraph></Typography>
          <Typography paragraph></Typography>
          <Typography></Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

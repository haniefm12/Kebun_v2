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
import { AddBox, ArrowRight, Edit, OpenInNew, Park } from "@mui/icons-material";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectGardenById } from "../../app/api/gardensApiSlice";
import { useEffect } from "react";
import { DEFAULT_IMAGE } from "../../config/urls";
import { formatDateTime } from "../../utils/formatDateTime";

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

const KebunCard = ({ gardenId, auth }) => {
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);
  const garden = useSelector((state) => selectGardenById(state, gardenId));
  // eslint-disable-next-line
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    if (garden?.notes) {
      const notesArray = garden.notes.filter((note) => note.note && note.date);
      setNotes(notesArray);
    }
  }, [garden?.notes]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleAddNoteClick = () => navigate(`/kebun/${gardenId}/notes/`);
  const handleViewClick = () => navigate(`/kebun/${gardenId}/`);
  const handleEdit = () => navigate(`/kebun/edit/${gardenId}/`);
  let edit;
  if (auth === true) {
    edit = (
      <IconButton aria-label="add to favorites" onClick={handleEdit}>
        <Edit />
      </IconButton>
    );
  } else {
    edit = null;
  }
  let title = "";
  let subheader = "";
  let address = " ";
  let description = " ";
  let image = " ";
  if (garden) {
    title = garden.name;
    address = garden.address;
    description = garden.description;
    subheader = `${garden.area} m² (${garden.area / 10000} ha)`;
    image = garden.image;

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
            <IconButton aria-label="settings" onClick={handleViewClick}>
              <OpenInNew />
            </IconButton>
          }
          title={title}
          subheader={subheader}
        />
        <CardMedia
          component="img"
          height="194"
          image={image ? image : DEFAULT_IMAGE.KEBUN}
          alt="Paella dish"
        />
        <CardContent
          sx={{
            minHeight: 80,
            maxHeight: 80,
            overflowY: "auto",
          }}
        >
          {address ? (
            <Typography variant="body2" color="text.secondary">
              {address}
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No address
            </Typography>
          )}
          {description ? (
            <Typography variant="caption" color="text.secondary">
              {description}
            </Typography>
          ) : (
            <Typography variant="caption" color="text.secondary">
              No description
            </Typography>
          )}
        </CardContent>
        <CardActions disableSpacing>
          {edit}
          <IconButton aria-label="add note" onClick={handleAddNoteClick}>
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
          </CardContent>
        </Collapse>
      </Card>
    );
  } else return null;
};
export default KebunCard;

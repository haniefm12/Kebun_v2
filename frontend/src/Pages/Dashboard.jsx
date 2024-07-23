import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Checkbox,
  Stack,
  CardHeader,
  CardMedia,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useGetGardensQuery } from "../app/api/gardensApiSlice";
import { useGetFinancesQuery } from "../app/api/financesApiSlice";
import { useGetNotesQuery } from "../app/api/notesApiSlice";
import { ArrowRight, Circle } from "@mui/icons-material";

function Dashboard() {
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
  const {
    data: gardens,
    isLoading: gardensIsLoading,
    isSuccess: gardensIsSuccess,
    isError: gardensIsError,
    error: gardensError,
  } = useGetGardensQuery("gardenList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: finances,
    isLoading: financesIsLoading,
    isSuccess: financesIsSuccess,
    isError: financesIsError,
    error: financesError,
  } = useGetFinancesQuery("financeList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: notes,
    isLoading: notesIsLoading,
    isSuccess: notesIsSuccess,
    isError: notesIsError,
    error: notesError,
  } = useGetNotesQuery("noteList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const gardenContent = gardensIsSuccess ? (
    <Grid container spacing={2} display="flex" flexWrap="wrap">
      {Object.keys(gardens.entities)
        .sort((a, b) => {
          if (gardens.entities[a].updatedAt && gardens.entities[b].updatedAt) {
            return gardens.entities[b].updatedAt.localeCompare(
              gardens.entities[a].updatedAt
            );
          } else {
            return 0; // or some other default value
          }
        })
        .slice(0, 4) // limit to 4 most updated gardens
        .map((gardenId, index) => (
          <Grid item key={gardenId} xs={12} sm={12} md={12} lg={6}>
            <Card
              sx={{
                minHeight: 300,
                border: "1px solid #FFFFFF", // add white border
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", // add grey shadow
              }}
            >
              <Grid container>
                <Grid item xs={12} sm={6} md={5}>
                  <CardMedia
                    sx={{ mt: 1, ml: 1 }}
                    component="img"
                    height="200"
                    image={
                      gardens.entities[gardenId] &&
                      gardens.entities[gardenId].image
                        ? gardens.entities[gardenId].image
                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/390px-No-Image-Placeholder.svg.png"
                    }
                    alt="No Image"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={7}>
                  <CardHeader
                    titleTypographyProps={{ fontWeight: "bold" }}
                    title={gardens.entities[gardenId].name}
                    subheader={gardens.entities[gardenId].address}
                    sx={{ mb: 0, pb: 0 }}
                  />
                  <CardContent
                    sx={{
                      mt: 0,
                      pt: 2,
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1,
                    }}
                  >
                    <Typography variant="body2">
                      {gardens.entities[gardenId].description}
                    </Typography>
                  </CardContent>
                </Grid>
              </Grid>
              <Typography sx={{ ml: 2, mt: 2, mb: 0 }} paragraph>
                Catatan:
              </Typography>
              <div>
                {gardens.entities[gardenId].notes &&
                gardens.entities[gardenId].notes.length > 0 ? (
                  [...gardens.entities[gardenId].notes] // create a copy of the notes array
                    .sort((a, b) => {
                      if (a.date && b.date) {
                        return b.date.localeCompare(a.date); // sort by date in descending order
                      } else {
                        return 0; // or some other default value
                      }
                    })
                    .slice(1, 3) // limit to 3 newest notes
                    .map((note, index) => (
                      <ListItem key={index}>
                        <ListItemText>
                          <Typography variant="body2">
                            {note.note ? note.note : "Tidak ada catatan"}{" "}
                            {/* show "Tidak ada catatan" if note.note is null or undefined */}
                          </Typography>

                          <Typography variant="caption">
                            {formatDateTime(note.date)}
                          </Typography>
                        </ListItemText>
                      </ListItem>
                    ))
                ) : (
                  <Typography>Tidak ada catatan</Typography>
                )}
              </div>
            </Card>
          </Grid>
        ))}
    </Grid>
  ) : gardensIsError ? (
    <Typography variant="h5">Error: {gardensError?.data?.message}</Typography>
  ) : (
    <Typography variant="h5">Loading...</Typography>
  );

  const financeContent = financesIsSuccess ? (
    <Grid container spacing={0}>
      <Grid item xs={6} md={6} xl={6}>
        <Typography variant="body2" align="center">
          Total Pengeluaran:{" "}
        </Typography>
      </Grid>
      <Grid item xs={6} md={6} xl={6}>
        <Typography variant="body1" align="center">
          {" "}
          Rp.{" "}
          {Object.keys(finances.entities)
            .reduce((acc, financeId) => {
              return acc + (finances.entities[financeId].totalCost || 0);
            }, 0)
            .toLocaleString("id-ID")}
          ,-
        </Typography>
      </Grid>
    </Grid>
  ) : financesIsError ? (
    <Typography align="center" variant="body1">
      Total Pengeluaran : Rp. 0,-
    </Typography>
  ) : (
    <Typography variant="h5">Loading...</Typography>
  );

  const noteElement = notesIsSuccess ? (
    Object.keys(notes.entities)
      .sort((a, b) => {
        const noteA = notes.entities[a];
        const noteB = notes.entities[b];
        return noteA.completed - noteB.completed; // sort by completed status (false comes first)
      })
      .map((noteId, index) => {
        const note = notes.entities[noteId];
        const thisDay = new Date();
        thisDay.setDate(thisDay.getDate());

        const scheduleDate = new Date(note.schedule);
        console.log("thisDay:", scheduleDate); // convert timestamp to Date object

        const thisDayYear = thisDay.getFullYear();
        const thisDayMonth = thisDay.getMonth();
        const thisDayDay = thisDay.getDate();

        const scheduleYear = scheduleDate.getFullYear();
        const scheduleMonth = scheduleDate.getMonth();
        const scheduleDay = scheduleDate.getDate();
        console.log(
          thisDayYear,
          thisDayMonth,
          thisDayDay,
          scheduleYear,
          scheduleMonth,
          scheduleDay
        );

        if (
          scheduleYear === thisDayYear &&
          scheduleMonth === thisDayMonth &&
          scheduleDay === thisDayDay
        ) {
          return (
            <Card
              key={noteId}
              sx={{
                mt: 1,
                mb: 2,
                mr: 2,
                border: "1px solid #FFFFFF", // add white border
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              <CardContent sx={{ p: 2, display: "flex" }}>
                <Checkbox checked={note.completed} />
                <Stack sx={{ ml: 1 }}>
                  <Typography variant="h6">{note.title}</Typography>
                  <Typography variant="body2">{note.text}</Typography>
                </Stack>
              </CardContent>
            </Card>
          );
        } else {
          return null;
        }
      })
  ) : notesIsError ? (
    <Typography variant="h5">
      Data Tidak Ditemukan : {notesError?.data?.message}
    </Typography>
  ) : (
    <Typography variant="h5">Loading...</Typography>
  );
  const noteContent =
    noteElement.length > 0 ? (
      noteElement
    ) : (
      <Typography variant="body1">Tidak ada tugas untuk hari ini</Typography>
    );
  return (
    <Grid container spacing={2} sx={{ pl: 4, pt: 2 }}>
      <Grid item xs={12} md={6} lg={7} xl={8}>
        <Typography variant="h4">Dashboard</Typography>
      </Grid>

      <Grid item xs={12} sm={12} md={8}>
        <Card>
          <Typography
            variant="h5"
            sx={{ fontStyle: "bold", pl: 2, pt: 2, pb: 1 }}
          >
            Perkembangan Kebun
          </Typography>
          <CardContent>{gardenContent}</CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={4} sx={{ pr: 4 }}>
        <Card sx={{ mt: 0, mb: 1 }}>
          <CardContent
            sx={{
              mt: 0,
              mb: 0,
              p: 0,
              pl: 1,
              pt: 1,
              alignContent: "center",
            }}
          >
            {financeContent}
          </CardContent>
        </Card>
        <Card sx={{ mt: 0 }}>
          <CardContent sx={{ mr: 0, pr: 0 }}>
            <Typography variant="h5">Tugas</Typography>
            {noteContent}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Dashboard;

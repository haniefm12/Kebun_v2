import React, { useState } from "react";
import NoteCard from "../Components/Card/NoteCard";
import useAuth from "../hooks/useAuth";
import {
  Box,
  Container,
  Grid,
  Typography,
  Select,
  MenuItem,
  Button,
  Stack,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useSelector } from "react-redux";
import { selectUserByUsername } from "../app/api/usersApiSlice";
import { useNotes, useUsers } from "../app/api/api";
import LoadingState from "../Components/state/LoadingState";
import ErrorNoData from "../Components/state/ErrorNoData";
import NewData from "../Components/FloatButton/NewData";

const Tugas = () => {
  const { username, isManager, isAdmin } = useAuth();
  const user = useSelector((state) => selectUserByUsername(state, username));
  const { data: notes, isLoading, isError, error } = useNotes();
  const {
    data: users,
    isLoading: usersLoading,
    isError: usersError,
  } = useUsers();

  let filterSelect;
  const [showFilters, setShowFilters] = useState(false);

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const [filteredUserId, setFilteredUserId] = useState(
    isManager || isAdmin ? "" : user?.id
  );

  const [selectedDate, setSelectedDate] = useState(null);

  const handleFilterChange = (event) => {
    setFilteredUserId(event.target.value);
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const getFilteredIds = () => {
    if (isManager || isAdmin) {
      if (filteredUserId) {
        return notes.ids.filter(
          (noteId) => notes.entities[noteId].user === filteredUserId
        );
      } else {
        return [...notes.ids];
      }
    } else {
      if (user) {
        return notes.ids.filter(
          (noteId) => notes.entities[noteId].user === user.id
        );
      } else {
        return []; // Return an empty array if user is null
      }
    }
  };

  const getFilteredIdsByDate = () => {
    const filteredIds = getFilteredIds(); // Get the filtered IDs based on user
    if (selectedDate) {
      const selectedDateUTC = selectedDate.getTime(); // Get the timestamp
      const startDate = new Date(selectedDateUTC);
      const endDate = new Date(selectedDateUTC);
      endDate.setDate(endDate.getDate() + 1);

      return filteredIds.filter((noteId) => {
        const scheduleDate = new Date(
          notes.entities[noteId].schedule
        ).getTime(); // Convert schedule date to timestamp
        return (
          scheduleDate >= startDate.getTime() &&
          scheduleDate < endDate.getTime()
        );
      });
    } else {
      return filteredIds; // Return the filtered IDs based on user
    }
  };
  if (isLoading || usersLoading || !user) {
    return <LoadingState />;
  }
  if (isError || usersError) {
    return <ErrorNoData error={error} />;
  }

  if (isManager || isAdmin) {
    const usersOptions = Object.keys(users.entities).map((userId) => ({
      id: userId,
      name: users.entities[userId].name,
    }));
    filterSelect = (
      <Select value={filteredUserId} onChange={handleFilterChange}>
        <MenuItem value="">All Users</MenuItem>
        {usersOptions.map((user) => (
          <MenuItem key={user.id} value={user.id}>
            {user.name}
          </MenuItem>
        ))}
      </Select>
    );
  } else {
    filterSelect = (
      <Select value={filteredUserId} onChange={handleFilterChange}>
        <MenuItem key={user.id} value={user.id}>
          {user.name}
        </MenuItem>
      </Select>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box pl={2} pb={2} pt={2} pr={2}>
        <Typography pl={0} pb={1} variant="h4">
          Daftar Tugas
        </Typography>

        <Button onClick={handleToggleFilters}>
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
        {showFilters && (
          <Stack direction="row" spacing={2} sx={{ mt: 0, ml: 0 }}>
            {filterSelect}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                slotProps={{
                  textField: {
                    InputLabelProps: {
                      shrink: true,
                    },
                  },
                }}
              />
            </LocalizationProvider>
            <Button
              onClick={() => {
                setFilteredUserId(isManager || isAdmin ? "" : user?.id);
                setSelectedDate(null);
              }}
            >
              Clear Filters
            </Button>
          </Stack>
        )}
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {getFilteredIdsByDate().map((noteId) => (
            <Grid item xs={12} sm={6} md={4} xl={3} key={noteId}>
              <NoteCard noteId={noteId.toString()} />
            </Grid>
          ))}
        </Grid>
      </Box>
      {(isAdmin || isManager) && <NewData />}
    </Container>
  );
};

export default Tugas;

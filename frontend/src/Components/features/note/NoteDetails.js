import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Container,
  Box,
  TableContainer,
  Table,
  Paper,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectNoteById,
  useUpdateNoteMutation,
} from "../../../app/api/notesApiSlice";
import { selectUserById } from "../../../app/api/usersApiSlice";
import { selectGardenById } from "../../../app/api/gardensApiSlice";
import useAuth from "../../../hooks/useAuth";

const NoteDetails = () => {
  let checkAuth;
  const { isManager, isAdmin } = useAuth();

  const { id } = useParams();
  const navigate = useNavigate();
  const [updateNote, { isSuccess }] = useUpdateNoteMutation();

  const note = useSelector((state) => selectNoteById(state, id));
  const garden = useSelector((state) => selectGardenById(state, note?.garden));
  const user = useSelector((state) => selectUserById(state, note?.user));
  const [status, setStatus] = useState(note ? note.completed : false);

  const handleEditClick = () => {
    navigate(`/tugas/${id}/edit`);
  };
  useEffect(() => {
    if (isSuccess && id !== undefined) {
      setStatus(false);
      navigate("/tugas");
    }
  }, [isSuccess, navigate, id]);

  const handleCompleteClick = async (e) => {
    e.preventDefault();
    if (status === false) {
      try {
        await updateNote({
          id: note.id,
          title: note.title,
          text: note.text,
          schedule: note.schedule,
          completed: true,
          garden: note.garden,
          user: note.user,
        });
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };
  if (isAdmin || isManager) {
    checkAuth = (
      <Button variant="contained" color="primary" onClick={handleEditClick}>
        Ubah tugas
      </Button>
    );
  } else {
    checkAuth = <></>;
  }

  return (
    <>
      {note && (
        <Container>
          <Typography variant="h5" sx={{ mt: 2, ml: 0 }}>
            Tugas Kebun
          </Typography>
          <Typography variant="h6" sx={{ mt: 0, ml: 0 }}>
            {note.title}
          </Typography>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell>
                    <strong>Tugas untuk:</strong> {user.name}
                  </TableCell>
                  <TableCell>
                    <strong>Tugas di:</strong>{" "}
                    {garden ? garden.name : "Unknown"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Jadwal:</strong>{" "}
                    {new Date(note?.schedule).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <strong>Status:</strong>{" "}
                    {note?.completed ? "Tugas Selesai" : "Tugas Belum Selesai"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Dibuat pada:</strong>{" "}
                    {new Date(note?.createdAt).toLocaleTimeString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell>
                    <strong>Diupdate pada:</strong>{" "}
                    {new Date(note?.updatedAt).toLocaleTimeString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Deskripsi:</strong> {note?.text}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            {checkAuth}
            <Button
              variant="contained"
              color="primary"
              onClick={handleCompleteClick}
              disabled={note.completed}
            >
              {note.completed
                ? "Tugas Selesai Dikerjakan"
                : "Tugas Telah Selesai"}
            </Button>
          </Box>
        </Container>
      )}
    </>
  );
};

export default NoteDetails;

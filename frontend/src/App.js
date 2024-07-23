import { createTheme } from "@mui/material";
import Layout from "./Components/Layout.jsx";
import { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard.jsx";
import Login from "./Pages/Login.jsx";
import Inventaris from "./Pages/Inventaris.jsx";
import Kebun from "./Pages/Kebun.jsx";
import KelolaAkun from "./Pages/KelolaAkun.jsx";
import Keuangan from "./Pages/Keuangan.jsx";
import Tugas from "./Pages/Tugas.jsx";
import Profile from "./Pages/Profile.jsx";
import EditUser from "./Components/features/user/EditUser.js";
import NewUserForm from "./Components/features/user/NewUserForm.js";
import Prefetch from "./Components/features/auth/Prefetch.js";
import PersistLogin from "./Components/features/auth/PersistLogin.js";
import RequireAuth from "./Components/features/auth/RequireAuth.js";
import { ROLES } from "./config/roles.js";
import { selectCurrentUser } from "./app/api/authSlice.js";
import { useSelector } from "react-redux";
import useAuth from "./hooks/useAuth.js";
import NewGardenForm from "./Components/features/garden/NewGardenForm.js";
import NewNoteForm from "./Components/features/note/NewNoteForm.js";
import NewInventoryForm from "./Components/features/inventory/NewInventoryForm.js";
import NewFinanceForm from "./Components/features/finance/NewFinanceForm.js";
import AddNewGardenNoteForm from "./Components/features/garden/AddGardenNoteForm";
import AddGardenNote from "./Components/features/garden/AddGardenNote.js";
import GardenDetails from "./Components/features/garden/GardenDetails.js";

function App() {
  const [mode, setMode] = useState("dark");
  const user = useSelector(selectCurrentUser);

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path="/" element={<Layout setMode={setMode} mode={mode} />}>
            <Route
              element={
                <RequireAuth
                  allowedRoles={[ROLES.admin, ROLES.employee, ROLES.manager]}
                />
              }
            >
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route element={<Prefetch />}>
                <Route path="dashboard" element={<Dashboard />} />

                <Route path="inventaris">
                  <Route index element={<Inventaris />} />
                  <Route path="new" element={<NewInventoryForm />} />
                </Route>
                <Route path="kebun">
                  <Route index element={<Kebun />} />
                  <Route path="new" element={<NewGardenForm />} />
                  <Route path=":id/notes/" element={<AddGardenNote />} />
                  <Route path=":id" element={<GardenDetails />} />
                </Route>
                <Route path="kelola-akun">
                  <Route index element={<KelolaAkun />} />
                  <Route path="new" element={<NewUserForm />} />
                  <Route path=":id" element={<EditUser />} />
                </Route>
                <Route path="keuangan">
                  <Route index element={<Keuangan />} />
                  <Route path="new" element={<NewFinanceForm />} />
                </Route>
                <Route path="tugas">
                  <Route index element={<Tugas />} />
                  <Route path="new" element={<NewNoteForm />} />
                </Route>
                <Route path="profile" element={<Profile />} />
              </Route>
            </Route>
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;

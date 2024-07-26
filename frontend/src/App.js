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

import Prefetch from "./Components/features/auth/Prefetch.js";
import PersistLogin from "./Components/features/auth/PersistLogin.js";
import RequireAuth from "./Components/features/auth/RequireAuth.js";
import { ROLES } from "./config/roles.js";
import AddGardenNote from "./Components/features/garden/AddGardenNote.js";
import GardenDetails from "./Components/features/garden/GardenDetails.js";
import EditGarden from "./Components/features/garden/EditGarden.js";
import EditInventory from "./Components/features/inventory/EditInventory.js";
import EditFinance from "./Components/features/finance/EditFinance.js";
import NoteDetail from "./Components/features/note/NoteDetails.js";
import EditNote from "./Components/features/note/EditNote.js";
import NewFinanceForm from "./Components/Form/NewFinanceForm.js";
import NewGardenForm from "./Components/Form/NewGardenForm.js";
import NewInventoryForm from "./Components/Form/NewInventoryForm.js";
import NewNoteForm from "./Components/Form/NewNoteForm.js";
import NewUserForm from "./Components/Form/NewUserForm.js";

function App() {
  const [mode, setMode] = useState("light");

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
                  <Route path="edit/:id" element={<EditInventory />} />
                </Route>
                <Route path="kebun">
                  <Route index element={<Kebun />} />
                  <Route path="new" element={<NewGardenForm />} />
                  <Route path=":id/notes/" element={<AddGardenNote />} />
                  <Route path=":id" element={<GardenDetails />} />
                  <Route path="edit/:id" element={<EditGarden />} />
                </Route>
                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.manager, ROLES.admin]} />
                  }
                >
                  <Route path="kelola-akun">
                    <Route index element={<KelolaAkun />} />
                    <Route path="new" element={<NewUserForm />} />
                    <Route path=":id" element={<EditUser />} />
                  </Route>
                </Route>
                <Route path="keuangan">
                  <Route index element={<Keuangan />} />
                  <Route path="new" element={<NewFinanceForm />} />
                  <Route path="edit/:id" element={<EditFinance />} />
                </Route>
                <Route path="tugas">
                  <Route index element={<Tugas />} />
                  <Route path="new" element={<NewNoteForm />} />
                  <Route path="detail/:id" element={<NoteDetail />} />
                  <Route path=":id/edit" element={<EditNote />} />
                </Route>
                <Route path="profile/:username" element={<Profile />} />
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

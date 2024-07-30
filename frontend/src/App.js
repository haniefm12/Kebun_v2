import React, { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import Loadable from "react-loadable";
import Layout from "./Components/Layout.jsx";
import Prefetch from "./Components/features/auth/Prefetch.js";
import PersistLogin from "./Components/features/auth/PersistLogin.js";
import RequireAuth from "./Components/features/auth/RequireAuth.js";
import { ROLES } from "./config/roles.js";
import LoadingState from "./Components/state/LoadingState.js";
const Dashboard = Loadable({
  loader: () => import("./Pages/Dashboard.jsx"),
  loading: () => <LoadingState />,
});
const Inventaris = Loadable({
  loader: () => import("./Pages/Inventaris.jsx"),
  loading: () => <LoadingState />,
});
const Kebun = Loadable({
  loader: () => import("./Pages/Kebun.jsx"),
  loading: () => <LoadingState />,
});
const KelolaAkun = Loadable({
  loader: () => import("./Pages/KelolaAkun.jsx"),
  loading: () => <LoadingState />,
});
const Keuangan = Loadable({
  loader: () => import("./Pages/Keuangan.jsx"),
  loading: () => <LoadingState />,
});
const Tugas = Loadable({
  loader: () => import("./Pages/Tugas.jsx"),
  loading: () => <LoadingState />,
});
const Profile = Loadable({
  loader: () => import("./Pages/Profile.jsx"),
  loading: () => <LoadingState />,
});
const EditUser = Loadable({
  loader: () => import("./Components/features/user/EditUser.js"),
  loading: () => <LoadingState />,
});
const AddGardenNote = Loadable({
  loader: () => import("./Components/features/garden/AddGardenNote.js"),
  loading: () => <LoadingState />,
});
const GardenDetails = Loadable({
  loader: () => import("./Components/features/garden/GardenDetails.js"),
  loading: () => <LoadingState />,
});
const EditGarden = Loadable({
  loader: () => import("./Components/features/garden/EditGarden.js"),
  loading: () => <LoadingState />,
});
const EditInventory = Loadable({
  loader: () => import("./Components/features/inventory/EditInventory.js"),
  loading: () => <LoadingState />,
});
const EditFinance = Loadable({
  loader: () => import("./Components/features/finance/EditFinance.js"),
  loading: () => <LoadingState />,
});
const NoteDetail = Loadable({
  loader: () => import("./Components/features/note/NoteDetails.js"),
  loading: () => <LoadingState />,
});
const EditNote = Loadable({
  loader: () => import("./Components/features/note/EditNote.js"),
  loading: () => <LoadingState />,
});
const NewFinanceForm = Loadable({
  loader: () => import("./Components/Form/NewFinanceForm.js"),
  loading: () => <LoadingState />,
});
const NewGardenForm = Loadable({
  loader: () => import("./Components/Form/NewGardenForm.js"),
  loading: () => <LoadingState />,
});
const NewInventoryForm = Loadable({
  loader: () => import("./Components/Form/NewInventoryForm.js"),
  loading: () => <LoadingState />,
});
const NewNoteForm = Loadable({
  loader: () => import("./Components/Form/NewNoteForm.js"),
  loading: () => <LoadingState />,
});
const NewUserForm = Loadable({
  loader: () => import("./Components/Form/NewUserForm.js"),
  loading: () => <LoadingState />,
});
const Login = Loadable({
  loader: () => import("./Pages/Login.jsx"),
  loading: () => <LoadingState />,
});

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

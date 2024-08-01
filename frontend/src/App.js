import React, { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import loadable from "@loadable/component";
import Layout from "./Components/Layout.jsx";
import Prefetch from "./Components/features/auth/Prefetch.js";
import PersistLogin from "./Components/features/auth/PersistLogin.js";
import RequireAuth from "./Components/features/auth/RequireAuth.js";
import { ROLES } from "./config/roles.js";
import LoadingState from "./Components/state/LoadingState.js";
const Dashboard = loadable(() => import("./Pages/Dashboard.jsx"), {
  fallback: <LoadingState />,
});
const Inventaris = loadable(() => import("./Pages/Inventaris.jsx"), {
  fallback: <LoadingState />,
});
const Kebun = loadable(() => import("./Pages/Kebun.jsx"), {
  fallback: <LoadingState />,
});
const KelolaAkun = loadable(() => import("./Pages/KelolaAkun.jsx"), {
  fallback: <LoadingState />,
});
const Keuangan = loadable(() => import("./Pages/Keuangan.jsx"), {
  fallback: <LoadingState />,
});
const Tugas = loadable(() => import("./Pages/Tugas.jsx"), {
  fallback: <LoadingState />,
});
const Profile = loadable(() => import("./Pages/Profile.jsx"), {
  fallback: <LoadingState />,
});
const EditUser = loadable(
  () => import("./Components/features/user/EditUser.js"),
  {
    fallback: <LoadingState />,
  }
);
const AddGardenNote = loadable(
  () => import("./Components/features/garden/AddGardenNote.js"),
  {
    fallback: <LoadingState />,
  }
);
const GardenDetails = loadable(
  () => import("./Components/features/garden/GardenDetails.js"),
  {
    fallback: <LoadingState />,
  }
);
const EditGarden = loadable(
  () => import("./Components/features/garden/EditGarden.js"),
  {
    fallback: <LoadingState />,
  }
);
const EditInventory = loadable(
  () => import("./Components/features/inventory/EditInventory.js"),
  {
    fallback: <LoadingState />,
  }
);
const EditFinance = loadable(
  () => import("./Components/features/finance/EditFinance.js"),
  {
    fallback: <LoadingState />,
  }
);
const NoteDetail = loadable(
  () => import("./Components/features/note/NoteDetails.js"),
  {
    fallback: <LoadingState />,
  }
);
const EditNote = loadable(
  () => import("./Components/features/note/EditNote.js"),
  {
    fallback: <LoadingState />,
  }
);
const NewFinanceForm = loadable(
  () => import("./Components/Form/NewFinanceForm.js"),
  {
    fallback: <LoadingState />,
  }
);
const NewGardenForm = loadable(
  () => import("./Components/Form/NewGardenForm.js"),
  {
    fallback: <LoadingState />,
  }
);
const NewInventoryForm = loadable(
  () => import("./Components/Form/NewInventoryForm.js"),
  {
    fallback: <LoadingState />,
  }
);
const NewNoteForm = loadable(() => import("./Components/Form/NewNoteForm.js"), {
  fallback: <LoadingState />,
});
const NewUserForm = loadable(() => import("./Components/Form/NewUserForm.js"), {
  fallback: <LoadingState />,
});
const Login = loadable(() => import("./Pages/Login.jsx"), {
  fallback: <LoadingState />,
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

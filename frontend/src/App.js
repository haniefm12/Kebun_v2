import { createTheme } from "@mui/material";
import Layout from "./Components/Layout.jsx";
import { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { Route, Routes } from "react-router-dom";
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

function App() {
  const [mode, setMode] = useState("dark");

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route
          path="/login"
          element={<Login setMode={setMode} mode={mode} />}
        />
        <Route path="/" element={<Layout setMode={setMode} mode={mode} />}>
          <Route index element={<Dashboard />} />

          <Route element={<PersistLogin />}>
            <Route element={<Prefetch />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="inventaris" element={<Inventaris />} />
              <Route path="kebun" element={<Kebun />} />
              <Route path="kelola-akun">
                <Route index element={<KelolaAkun />} />
                <Route path="new" element={<NewUserForm />} />
                <Route path=":id" element={<EditUser />} />
              </Route>
              <Route path="keuangan" element={<Keuangan />} />
              <Route path="tugas" element={<Tugas />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;

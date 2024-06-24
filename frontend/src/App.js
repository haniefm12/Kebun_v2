import { Box, createTheme } from "@mui/material";
import Layout from "./Components/Layout.jsx";
import { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard.jsx";
import Login from "./Pages/Login.jsx";
import Inventaris from "./Pages/Inventaris.jsx";
import Kebun from "./Pages/Kebun.jsx";
import KelolaAkun from "./Pages/KelolaAkun.jsx";
import Keuangan from "./Pages/Keuangan.jsx";
import Tugas from "./Pages/Tugas.jsx";
import Profile from "./Pages/Profile.jsx";

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
        <Route path="/" element={<Layout setMode={setMode} mode={mode} />}>
          <Route index element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inventaris" element={<Inventaris />} />
          <Route path="kebun" element={<Kebun />} />
          <Route path="kelola-akun" element={<KelolaAkun />} />
          <Route path="keuangan" element={<Keuangan />} />
          <Route path="tugas" element={<Tugas />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;

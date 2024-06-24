import Sidebar from "./Components/Sidebar.jsx";
// import Navbar from "./components/Navbar";
// import Layout from "./components/Layout";
import Dashboard from "./Pages/Dashboard.jsx";
import { Box, Stack } from "@mui/material";
import Navbar from "./Components/Navbar.jsx";

function App() {
  return (
    <Box>
      <Navbar></Navbar>
      <Stack direction="row" spacing={2} justifyContent="space-around">
        <Sidebar></Sidebar>
        <Dashboard></Dashboard>
      </Stack>
    </Box>
  );
}

export default App;

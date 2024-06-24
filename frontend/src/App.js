import { Box, createTheme } from "@mui/material";
import Layout from "./Components/Layout.jsx";
import { useState } from "react";
import { ThemeProvider } from "@emotion/react";

function App() {
  const [mode, setMode] = useState("dark");

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Layout setMode={setMode} mode={mode}></Layout>
      </Box>
    </ThemeProvider>
  );
}

export default App;

import { Container, Typography, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
const NoAccessPage = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="sm" sx={{ py: 4, mt: 10, textAlign: "center" }}>
      <Typography variant="h4" align="center" color="error">
        Anda tidak memiliki akses untuk mengunjungi halaman ini
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={() => navigate("/dashboard")}
      >
        Kembali
      </Button>
    </Container>
  );
};

export default NoAccessPage;

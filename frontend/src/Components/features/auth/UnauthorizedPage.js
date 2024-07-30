import { ParkRounded } from "@mui/icons-material";
import React from "react";
import {
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
  const [countdown, setCountdown] = useState(30);

  const navigate = useNavigate();

  useEffect(() => {
    const timer =
      countdown > 0 && setInterval(() => setCountdown(countdown - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  useEffect(() => {
    if (countdown === 0) {
      navigate("/login");
    }
  }, [countdown, navigate]);

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        margin: "10px",
      }}
    >
      <Card sx={{ maxWidth: 1000, padding: 4 }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "left", mb: 4 }}>
            <ParkRounded sx={{ color: "green" }}></ParkRounded>
            <Typography
              variant="h5"
              component="h1"
              sx={{ ml: 1, color: "green" }}
            >
              KEBUN
            </Typography>
          </Box>
          <Typography sx={{ color: "red" }} variant="h3" align="center">
            Akses Ditolak!
          </Typography>
          <Typography variant="body1" align="center" sx={{ mt: 2, mb: 1 }}>
            Anda harus login terlebih dahulu untuk mengakses halaman ini.
          </Typography>
          <Typography variant="body2" align="center" sx={{ mb: 4 }}>
            Jika anda belum memiliki akun untuk login silahkan hubungi admin.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLoginClick}
            >
              Login
            </Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "right", mt: 4 }}>
            <Typography variant="caption" align="center">
              akan dialihkan ke halaman login dalam {countdown} detik
            </Typography>
            <CircularProgress
              variant="determinate"
              value={((30 - countdown) / 30) * 100}
              size={20}
              sx={{ ml: 2 }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UnauthorizedPage;

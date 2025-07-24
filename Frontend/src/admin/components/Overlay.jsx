import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AdminLoginForm from './AdminLoginForm';
import AdminSignupForm from './AdminSignupForm';
import { useNavigate } from 'react-router-dom';

export default function Overlay() {
  const navigator = useNavigate();
  return (
    <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 999999999 }}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <Box sx={{ mb: 2 ,fontFamily:'ketchup', fontSize: '4rem', fontWeight: 600 }}>
          <h2>Please log in to access the dashboard</h2>
        </Box>

        <Stack spacing={2} direction="row" sx={{ mb: 3 }}>
          <button
            onClick={() => navigator("login")}
            style={{
              padding: "0.6rem 1.4rem",
              background: "#1976d2",
              border: "none",
              color: "#fff",
              fontWeight: 500,
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Login
          </button>

          <button
            onClick={() => navigator("signup")}
            style={{
              padding: "0.6rem 1.4rem",
              background: "#fff",
              color: "#1976d2",
              fontWeight: 500,
              border: "2px solid #1976d2",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Sign Up
          </button>
        </Stack>

        {/* {authMode === "login" && <AdminLoginForm />}
        {authMode === "signup" && <AdminSignupForm  />} */}
      </Box>
    </Box>
  );
}

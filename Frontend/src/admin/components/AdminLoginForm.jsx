import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
} from '@mui/material';

export default function AdminLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let inpRole = role.toLowerCase();
      const res = await axios.post('http://localhost:8080/admin/login', {
        email,
        password,
        role: inpRole,
      });

      if (res.data.success) {
        localStorage.setItem('LoggedIn', "true");
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('adminId', res.data.adminId);
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('adminName', res.data.adminName);
        localStorage.setItem('email', res.data.email);

        toast.success('Login successful!', {
          position: 'top-center',
          autoClose: 3000,
        });

        navigate('/admin');
      }
    } catch (err) {
      console.error("Login Error:", err);
      toast.error(err?.response?.data?.error || 'Login failed', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        position: 'relative',
        backgroundColor: '#f5f5f5',
        overflow: 'hidden',
      }}
    >
      {/* Arc-shaped background image in top-right corner */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('/images/pizz.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          clipPath: 'circle(95% at 100% 0%)',
          zIndex: 0,
          '@media (max-width: 600px)': {
            clipPath: 'circle(100% at 100% 100%)', // Full circle on smaller screens
          }
        }}
      />

      {/* Login Form */}
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 3,
          maxWidth: 400,
          width: '100%',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255,255,255,0.85)',
          zIndex: 1,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom fontWeight={600}>
          🍕 Admin Login
        </Typography>

        <form onSubmit={handleLogin}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              variant="outlined"
            />

            <TextField
              label="Role"
              value={role}
              required
              onChange={(e) => setRole(e.target.value)}
              fullWidth
              variant="outlined"
            />

            <TextField
              label="Password"
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              variant="outlined"
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 1, py: 1.2, fontWeight: 600 }}
            >
              Login
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}

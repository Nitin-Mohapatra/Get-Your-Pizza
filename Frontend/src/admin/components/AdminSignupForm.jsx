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

export default function AdminSignupForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'http://localhost:8080/admin/signup',
        { name, email, password, role },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (res.data.success) {
        localStorage.setItem("LoggedIn", "true");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("adminId", res.data.adminId);
        localStorage.setItem("adminName", res.data.adminName);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem('isLoggedIn', true);

        toast.success("Signup successful!", { position: 'top-center' });
        navigate('/admin');
      }
    } catch (err) {
      console.error("Signup Error:", err);
      toast.error(err?.message || 'Signup failed', {
        position: 'top-center',
      });
    }
  };

  return (
    <Box
      minHeight="100vh"
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: '#f5f5f5',
        overflow: 'hidden',
        p: 2,
      }}
    >
      {/* Curved Background Image */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: `url('/images/bg.jpg')`, // adjust if needed
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          clipPath: 'circle(75% at 100% 0%)',
          zIndex: 0,
          '@media (max-width: 600px)': {
            clipPath: 'circle(100% at 100% 100%)', // Full circle on smaller screens
          },
        }}
      />

      {/* Form Box */}
      <Paper
        elevation={6}
        sx={{
          zIndex: 1,
          padding: 4,
          borderRadius: 3,
          maxWidth: 450,
          width: '100%',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255,255,255,0.9)',
        }}
      >
        <Typography variant="h5" align="center" gutterBottom fontWeight={600}>
          🍕 Admin Signup
        </Typography>

        <form onSubmit={handleSignup}>
          <Stack spacing={2}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 1, py: 1.2, fontWeight: 600 }}
            >
              Sign Up
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}

import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Stack, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminSignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/admin/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "admin",
      });

      if (response.data.success) {
        const { token, adminId } = response.data;
        localStorage.setItem("adminToken", token);
        localStorage.setItem("adminId", adminId);
        localStorage.setItem("adminName", formData.name);
        localStorage.setItem("adminEmail", formData.email);
        localStorage.setItem("LoggedIn", true);
        toast.success("Signup Successful!");
        navigate("/admin/dashboard");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, width: 350 }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" gutterBottom>Admin Signup</Typography>

          <TextField
            fullWidth
            margin="normal"
            name="name"
            label="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(p => !p)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Stack mt={2}>
            <Button type="submit" variant="contained" fullWidth>
              Sign Up
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default AdminSignupForm;

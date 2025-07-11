import React, { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Box, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Both fields are required');
      setSuccess('');
      return;
    }
    setError('');
    try {
      // Replace with your real API endpoint
      const res = await axios.post('http://localhost:5000/api/login', form);
      if (res.data.success) {
        setSuccess('Login successful! Redirecting to Home...');
        setTimeout(() => navigate('/'), 1500);
      } else {
        setError('Invalid credentials');
        setSuccess('');
      }
    } catch (err) {
      setError('Server error');
      setSuccess('');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <Paper elevation={3} sx={{ p: 4, width: 350 }}>
        <Typography variant="h4" gutterBottom>Login</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Login;

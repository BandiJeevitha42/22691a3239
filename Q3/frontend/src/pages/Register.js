import React, { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Box, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError('All fields are required');
      setSuccess('');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      setSuccess('');
      return;
    }
    setError('');
    try {
      // Replace with your real API endpoint
      const res = await axios.post('http://localhost:5000/api/register', {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      if (res.data.success) {
        setSuccess('Registration successful! Redirecting to Home...');
        setTimeout(() => navigate('/'), 1500);
      } else {
        setError(res.data.message || 'Registration failed');
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
        <Typography variant="h4" gutterBottom>Register</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
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
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Register; 
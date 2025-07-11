import React from 'react';
import { Typography, Button, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <Paper elevation={3} sx={{ p: 4, width: 350, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Dashboard</Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Welcome! You are logged in.
        </Typography>
        <Button variant="outlined" color="primary" onClick={() => navigate('/')}>Logout</Button>
      </Paper>
    </Box>
  );
}

export default Dashboard; 
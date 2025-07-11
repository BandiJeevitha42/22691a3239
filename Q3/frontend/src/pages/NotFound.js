import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="60vh">
      <Typography variant="h4" gutterBottom>404 - Not Found</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>The page you are looking for does not exist.</Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>Go Home</Button>
    </Box>
  );
}

export default NotFound; 
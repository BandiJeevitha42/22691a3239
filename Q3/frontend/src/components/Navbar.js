import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static" color="primary" elevation={3}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          MyApp
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">Home</Button>
          <Button color="inherit" component={RouterLink} to="/register">Register</Button>
          <Button color="inherit" component={RouterLink} to="/login">Login</Button>
          <Button color="inherit" component={RouterLink} to="/dashboard">Dashboard</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 
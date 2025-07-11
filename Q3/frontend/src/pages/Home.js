import React from 'react';
import { Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: 'center', marginTop: 40 }}>
      <Typography variant="h3" gutterBottom>Welcome to the React Frontend</Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Please register or login to continue.
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/register')}>
          Register
        </Button>
        <Button variant="outlined" color="primary" onClick={() => navigate('/login')}>
          Login
        </Button>
      </Stack>
    </div>
  );
}

export default Home; 
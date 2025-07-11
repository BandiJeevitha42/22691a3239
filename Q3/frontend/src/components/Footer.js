import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ mt: 4, py: 2, textAlign: 'center', bgcolor: 'background.paper', boxShadow: 1 }}>
      <Typography variant="body2" color="text.secondary">
        &copy; {new Date().getFullYear()} MyApp. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer; 
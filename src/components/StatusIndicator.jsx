import React from 'react';
import { Box, Chip, Typography } from '@mui/material';

const StatusIndicator = ({ label, status }) => {
  return (
    <Box sx={{ marginBottom: '10px' }}>
      <Typography variant='body1' gutterBottom>
        {label}{' '}
        <Chip
          label={status ? 'PASS' : 'FAIL'}
          color={status ? 'success' : 'error'}
          variant='outlined'
          size='small'
          sx={{ textTransform: 'uppercase' }}
        />
      </Typography>
    </Box>
  );
};

export default StatusIndicator;

import React from 'react';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

interface SlugLimitProps {
  limit?: number;
  onSubmit: (newLimit: number) => void;
  onLimitChange: (newLimit: number) => void;
};

export const SlugLimitSetter = (props: SlugLimitProps) => {
  const { limit, onSubmit, onLimitChange } = props;

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newLimit = parseInt(event.target.value, 10);
    if (isNaN(newLimit) || newLimit < 0) {
      newLimit = 0;
    }
    
    onLimitChange(newLimit);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(limit!);
  };

  return (
    <Box component={Paper} elevation={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
      <Typography variant="h6">
        Max URL Slug Limit
      </Typography>
      <form onSubmit={handleSubmit} style={{ marginTop: 15, width: '100%' }}>
        <TextField
          fullWidth
          label="Limit"
          variant="outlined"
          type="number"
          value={limit}
          onChange={handleLimitChange}
          InputProps={{ inputProps: { min: 0 } }} // to ensure non-negative numbers
        />
        <Button variant="contained" color="primary" type="submit" style={{ marginTop: 15 }}>
          Set Limit
        </Button>
      </form>
    </Box>
  );
};
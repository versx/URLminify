import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';

import { Routes } from '../consts';
import { AuthService } from '../services';

export const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const from = location.state?.from || Routes.dashboard;

  const handleRegister = async () => {
    const response = await AuthService.register(username, password);
    console.log('register response:', response);
    if (response.status !== 'ok') {
      enqueueSnackbar('Failed to register your user account!', { variant: 'error' });
      return;
    }

    enqueueSnackbar('Successfully registered your user account! Redirecting to login page.', { variant: 'success' });
    localStorage.setItem('isAuthenticated', 'true');
    window.location.href = from;
  };

  return (
    <Container style={{ height: '35vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper style={{ padding: '20px', width: '300px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ marginBottom: '15px' }}
        />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ marginBottom: '15px' }}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          variant="outlined"
          type="password"
          value={passwordConfirm}
          onChange={e => setPasswordConfirm(e.target.value)}
          style={{ marginBottom: '15px' }}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleRegister}
        >
          Create Account
        </Button>
      </Paper>
    </Container>
  );
};
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

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = async () => {
    const response = await AuthService.login(username, password);
    //console.log('login response:', response);
    if (response.status !== 'ok') {
      enqueueSnackbar('Failed to login!', { variant: 'error' });
      return;
    }

    enqueueSnackbar('Successfully logged in!', { variant: 'success' });
    localStorage.setItem('isAuthenticated', 'true');
    window.location.href = location.state?.from || Routes.dashboard;
  };

  return (
    <Container style={{ height: '35vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper
        style={{ padding: '20px', width: '300px' }}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            handleLogin();
            return;
          }            
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Login
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
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
        >
          Login
        </Button>
      </Paper>
    </Container>
  );
};
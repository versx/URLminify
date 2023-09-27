import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

import { Routes } from '../consts';
import { AuthService } from '../services';

export const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || Routes.dashboard;

  const handleRegister = async () => {
    const response = await AuthService.register(username, password);
    console.log('register response:', response);
    if (response.status !== 'ok') {
      console.error('failed to register');
      return;
    }

    localStorage.setItem('isAuthenticated', 'true');
    navigate(from);
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
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';

import { DefaultEnableRegistration, Routes, SettingKeys } from '../consts';
import { AuthService, SettingsService } from '../services';
import { Setting } from '../types';

export const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [enableRegister, setEnableRegister] = useState(DefaultEnableRegistration);
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const from = location.state?.from || Routes.dashboard;

  const handleRegister = async () => {
    const response = await AuthService.register(username, password);
    if (response.status !== 'ok') {
      enqueueSnackbar('Failed to register your user account!', { variant: 'error' });
      return;
    }

    enqueueSnackbar('Successfully registered your user account! Redirecting to login page.', { variant: 'success' });
    localStorage.setItem('isAuthenticated', 'true');
    window.location.href = from;
  };

  useEffect(() => {
    SettingsService.getSettings().then((response: any) => {
      if (response.status !== 'ok') {
        enqueueSnackbar('Failed to fetch settings from API.', { variant: 'error' });
        return;
      }
      const enableRegistrationSetting = response.settings.find((setting: Setting) => setting.name === SettingKeys.EnableRegistration);
      const enableRegistration = parseInt(enableRegistrationSetting?.value) !== 0 ?? DefaultEnableRegistration;
      setEnableRegister(enableRegistration);
    });
  }, [enqueueSnackbar]);

  return (
    <Container style={{ height: '35vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper style={{ padding: '20px', width: '300px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        {!enableRegister ? (
          <>
            Registration has been disabled by the administrator.
          </>
        ) : (
          <>
            <TextField
              autoFocus
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
          </>
        )}
      </Paper>
    </Container>
  );
};
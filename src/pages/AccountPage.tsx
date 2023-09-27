import React, { useState } from 'react';
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

import { ApiKeyTextField } from '../components';
import { AuthService, UserService } from '../services';
import { getUserToken } from '../stores';

export const AccountPage = () => {
  const currentUser = getUserToken();

  const handleDeleteAccount = async () => {
    const result = window.confirm(`Are you sure you want to PERMANENTLY delete your account? All of your short URLs will be deleted and inactive if you continue.`);
    if (!result) {
      return;
    }

    const response = await UserService.deleteAccount(currentUser?.id);
    if (response.status !== 'ok') {
      // TODO: Error
      return;
    }
    AuthService.logout();
  };

  return (
    <Container style={{ height: '35vh' }}>
      <Typography variant="h3" gutterBottom>
        Settings
      </Typography>
      <Paper style={{ padding: '20px', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h6" align="center" gutterBottom>
          API Key
        </Typography>
        <ApiKeyTextField initialValue={currentUser?.apiKey} />
        <br />

        <Typography variant="h6" align="center" gutterBottom>
          Change Password
        </Typography>
        <ChangePassword />
        <br />

        <Typography variant="h6" align="center" gutterBottom>
          Delete Account
        </Typography>
        <Button
          variant="contained"
          size="small"
          color="error"
          onClick={handleDeleteAccount}
        >
          Delete
        </Button>
        <br />
      </Paper>
    </Container>
  );
};

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match");
      return;
    }
    // TODO: Add logic to change the password, e.g., API call.
    console.log("Password changed successfully"); // For demonstration purposes
  };

  return (
    <Container component={Paper} elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <TextField
        fullWidth
        type="password"
        label="Current Password"
        variant="outlined"
        value={currentPassword}
        onChange={e => setCurrentPassword(e.target.value)}
        style={{ marginBottom: '15px' }}
      />
      <TextField
        fullWidth
        type="password"
        label="New Password"
        variant="outlined"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
        style={{ marginBottom: '15px' }}
      />
      <TextField
        fullWidth
        type="password"
        label="Confirm New Password"
        variant="outlined"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        error={Boolean(error)}
        helperText={error}
        style={{ marginBottom: '20px' }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Change Password
      </Button>
    </Container>
  );
};
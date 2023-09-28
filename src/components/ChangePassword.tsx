import React, { useState } from 'react';
import {
  Button,
  TextField,
} from '@mui/material';

import { AuthService, UserService } from '../services';
import { getUserToken } from '../stores';

export const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const currentUser = getUserToken();

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match');
      return;
    }

    const response = await UserService.changePassword(currentUser?.id, currentPassword, confirmPassword);
    console.log('changePassword response:', response);
    if (response.status !== 'ok') {
      // TODO: Error
      return;
    }

    // TODO: Show success
    console.log('Password changed successfully');
    AuthService.logout();
  };

  return (
    <>
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
    </>
  );
};
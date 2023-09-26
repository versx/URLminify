import React, { useState } from 'react';
import {
  AlertColor,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  FileCopy as FileCopyIcon,
} from '@mui/icons-material';

import { SnackbarAlert } from '.';
import { UserService } from '../services';
import { clearUserToken, getUserToken, setUserToken } from '../stores';

export const ApiKeyTextField = (props: any) => {
  const { initialValue } = props;
  const [apiKey, setApiKey] = useState(initialValue);
  const [alertState, setAlertState] = useState({
    open: false,
    title: '',
    severity: 'success' as AlertColor,
  });
  const currentUser = getUserToken();

  const resetApiKey = async () => {
    const result = window.confirm(`You are about to reset your API key, are you sure you want to do this?`);
    if (!result) {
      return;
    }

    const response = await UserService.resetApiKey(currentUser?.id);
    //console.log('resetApiKey response:', response);
    if (response.status !== 'ok') {
      setAlertState({
        open: true,
        title: 'Error occurred resetting API key.',
        severity: 'error',
      });
      return;
    }

    clearUserToken();
    setUserToken({
      ...currentUser,
      apiKey: response.apiKey,
    });

    setApiKey(response.apiKey);
    setAlertState({
      open: true,
      title: 'API key was successfully reset!',
      severity: 'success',
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    setAlertState({
      open: true,
      title: 'API key was successfully copied to the clipboard!',
      severity: 'success',
    });
  };

  const handleCloseAlert = () => setAlertState({open: false, title: '', severity: 'info'});

  return (
    <>
      <SnackbarAlert
        open={alertState.open}
        title={alertState.title}
        severity={alertState.severity}
        onClose={handleCloseAlert}
      />
      <TextField
        disabled
        fullWidth
        multiline
        label="API Key"
        value={apiKey}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={resetApiKey} title="Reset API Key">
                <RefreshIcon />
              </IconButton>
              <IconButton onClick={copyToClipboard} title="Copy to Clipboard">
                <FileCopyIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        variant="outlined"
        style={{ marginBottom: '15px' }}
      />
    </>
  );
};
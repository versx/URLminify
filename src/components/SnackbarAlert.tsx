import React, { forwardRef } from 'react';
import {
  Alert as MuiAlert,
  AlertColor,
  AlertProps,
  Snackbar,
  Stack,
  Slide,
} from '@mui/material';

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface SnackbarProps {
  open: boolean;
  title: string;
  severity: AlertColor;
  onClose: () => void;
};

export const SnackbarAlert = (props: SnackbarProps) => {
  const { open, title, severity, onClose } = props;

  const handleClose = (event?: any | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
  };

  const TransitionUp = (props: any) => <Slide {...props} direction="up" />;

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={TransitionUp}
        onClose={handleClose}
      >
        <Alert
          severity={severity}
          sx={{ width: '100%' }}
          onClose={handleClose}
        >
          {title}
        </Alert>
      </Snackbar>
    </Stack>
  );
};
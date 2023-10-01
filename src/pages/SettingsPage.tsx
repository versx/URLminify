import {
  Button,
  Container,
  Paper,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';

import { ApiKeyTextField, ChangePassword } from '../components';
import { AuthService, UserService } from '../services';
import { getUserToken } from '../stores';

export const SettingsPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const currentUser = getUserToken();

  const handleDeleteAccount = async () => {
    const result = window.confirm(`Are you sure you want to PERMANENTLY delete your account? All of your short URLs will be deleted and inactive if you continue.`);
    if (!result) {
      return;
    }

    const result2 = window.confirm(`Are you 100% positive?`);
    if (!result2) {
      return;
    }

    const response = await UserService.deleteAccount(currentUser?.id);
    if (response.status !== 'ok') {
      enqueueSnackbar('Failed to delete your account.', { variant: 'error' });
      return;
    }

    enqueueSnackbar('Account has been deleted, logging you out.', { variant: 'success' });
    AuthService.logout();
  };

  return (
    <Container style={{ height: '35vh' }}>
      <Typography variant="h4" gutterBottom style={{textAlign: 'center'}}>
        Settings
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '20px', justifyContent: 'center', alignItems: 'center' }}>
        <Container component={Paper} elevation={2} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h6" align="center" gutterBottom>
            API Key
          </Typography>
          <ApiKeyTextField initialValue={currentUser?.apiKey} />
        </Container>

        <Container component={Paper} elevation={2} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h6" align="center" gutterBottom>
            Change Password
          </Typography>
          <ChangePassword />
        </Container>

        <Container component={Paper} elevation={2} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h6" align="center" gutterBottom>
            Delete Account
          </Typography>
          <Typography paragraph align="center" gutterBottom>
            This action is irreversible. All account data will be deleted from the
            system including any short URLs that you've created if you continue.
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={handleDeleteAccount}
          >
            Delete
          </Button>
        </Container>
      </div>
    </Container>
  );
};
import {
  Button,
  Container,
  Paper,
  Typography,
} from '@mui/material';

import { ApiKeyTextField, ChangePassword } from '../components';
import { AuthService, UserService } from '../services';
import { getUserToken } from '../stores';

export const AccountPage = () => {
  const currentUser = getUserToken();

  const handleDeleteAccount = async () => {
    const result = window.confirm(`Are you sure you want to PERMANENTLY delete your account? All of your short URLs will be deleted and inactive if you continue.`);
    if (!result) {
      return;
    }

    const result2 = window.confirm(`Are you 100% posititive?`);
    if (!result2) {
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
          <Button
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
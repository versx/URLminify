import {
  Container,
  Paper,
  Typography,
} from '@mui/material';

import { ApiKeyTextField } from '../components';
import { getUserToken } from '../stores';

export const AccountPage = () => {
  const currentUser = getUserToken();

  return (
    <Container style={{ height: '35vh', justifyContent: 'center', alignItems: 'center' }}>
      <Paper style={{ padding: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          My Account
        </Typography>

        <Typography variant="h6" align="center" gutterBottom>
          API Key
        </Typography>
        <ApiKeyTextField initialValue={currentUser?.apiKey} />
        <br />

        <Typography variant="h6" align="center" gutterBottom>
          Change Password
        </Typography>
        <br />

        <Typography variant="h6" align="center" gutterBottom>
          Delete Account
        </Typography>
        <br />
      </Paper>
    </Container>
  );
};
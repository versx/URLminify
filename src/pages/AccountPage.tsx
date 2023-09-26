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
        <ApiKeyTextField
          initialValue={currentUser?.apiKey}
        />
      </Paper>
    </Container>
  );
};
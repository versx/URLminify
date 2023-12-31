import {
  Button,
  Container,
  Paper,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';

import {
  ApiKeyTextField,
  BreadcrumbItem,
  Breadcrumbs,
  ChangePassword,
  ThemeSelector,
} from '../components';
import { useColorMode } from '../contexts';
import { AuthService, UserService } from '../services';
import { getUserToken } from '../stores';

const crumbs: BreadcrumbItem[] = [{
  text: 'Dashboard',
  href: '/',
  selected: false,
},{
  text: 'Settings',
  href: '/settings',
  selected: true,
}];

export const SettingsPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { mode, setColorMode } = useColorMode();
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
      <Breadcrumbs crumbs={crumbs} />

      <Typography variant="h4" gutterBottom style={{textAlign: 'center'}}>
        Settings
      </Typography>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Container component={Paper} elevation={0} style={{ padding: '20px', marginTop: '20px', border: '1px solid grey' }}>
          <Typography variant="h6" align="center" gutterBottom>
            Theme
          </Typography>
          <ThemeSelector
            theme={mode}
            onThemeChange={setColorMode}
          />
        </Container>

        <Container component={Paper} elevation={0} style={{ padding: '20px', marginTop: '20px', border: '1px solid grey' }}>
          <Typography variant="h6" align="center" gutterBottom>
            API Key
          </Typography>
          <ApiKeyTextField initialValue={currentUser?.apiKey} />
        </Container>

        <Container component={Paper} elevation={0} style={{ padding: '20px', marginTop: '20px', border: '1px solid grey' }}>
          <Typography variant="h6" align="center" gutterBottom>
            Change Password
          </Typography>
          <ChangePassword />
        </Container>

        <Container component={Paper} elevation={0} style={{ padding: '20px', marginTop: '20px', border: '1px solid grey' }}>
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
import {
  Container,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  FileCopy as FileCopyIcon,
} from '@mui/icons-material';

import { getUserToken } from '../stores';

export const AccountPage = () => {
  const currentUser = getUserToken();

  return (
    <Container style={{ height: '35vh', justifyContent: 'center', alignItems: 'center' }}>
      <Paper style={{ padding: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          My Account
        </Typography>
        <ApiKeyField
          initialValue={currentUser?.apiKey}
        />
      </Paper>
    </Container>
  );
};

const ApiKeyField = (props: any) => {
  const { initialValue } = props;

  const resetApiKey = () => {
    const result = window.confirm(`You are about to reset your API key, are you sure you want to do this?`);
    if (!result) {
      return;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(initialValue);
    // TODO: Maybe provide feedback to user, like showing a toast message or changing button color briefly.
  };

  return (
    <TextField
      fullWidth
      disabled
      label="API Key"
      value={initialValue}
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
  );
};
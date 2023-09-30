import {
  Container,
  Typography,
} from '@mui/material';

import { SlugLimitSetter } from '../../components';

export const AdminSettingsPage = () => {
  const handleSubmit = (newLimit: number) => {
    console.log('handleSubmit:', newLimit);
    // TODO: Update daily slug limit
  };

  return (
    <Container style={{ height: '35vh' }}>
      <Typography variant="h4" gutterBottom>
        Admin - Settings
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '20px', justifyContent: 'center', alignItems: 'center' }}>
        <SlugLimitSetter
          initialLimit={1000}
          onSubmit={handleSubmit}
        />
      </div>
    </Container>
  );
};
import {
  Container,
  Typography,
} from '@mui/material';

import { UserTable } from '../../components';

export const AdminUsersPage = () => {
  return (
    <Container sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Admin - Users
      </Typography>
      <UserTable />
    </Container>
  );
};
import {
  Container,
  Typography,
} from '@mui/material';

import { UserTable } from '../../components';

export const AdminUsersPage = () => {
  return (
    <Container sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom style={{textAlign: 'center'}}>
        Admin - Users
      </Typography>
      <UserTable />
    </Container>
  );
};
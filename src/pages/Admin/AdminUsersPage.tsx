import {
  Container,
  Typography,
} from '@mui/material';

import { BreadcrumbItem, Breadcrumbs, UserTable } from '../../components';

const crumbs: BreadcrumbItem[] = [{
  text: 'Dashboard',
  color: 'white',
  href: '/',
  selected: false,
},{
  text: 'Admin',
  color: 'white',
  href: '/admin',
  selected: false,
},{
  text: 'Users',
  color: 'white',
  href: '/admin/users',
  selected: true,
}];

export const AdminUsersPage = () => {
  return (
    <Container sx={{ width: '100%' }}>
      <Breadcrumbs crumbs={crumbs} />

      <Typography variant="h4" gutterBottom style={{textAlign: 'center'}}>
        Admin - Users
      </Typography>

      <UserTable />
    </Container>
  );
};
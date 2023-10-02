import {
  Container,
  Typography,
} from '@mui/material';

import { BreadcrumbItem, Breadcrumbs, ShortUrlTable } from '../../components';

const crumbs: BreadcrumbItem[] = [{
  text: 'Dashboard',
  href: '/',
  selected: false,
},{
  text: 'Admin',
  href: '/admin',
  selected: false,
},{
  text: 'Short URLs',
  href: '/admin/urls',
  selected: true,
}];

export const AdminShortUrlsPage = () => {
  return (
    <Container sx={{ width: '100%' }}>
      <Breadcrumbs crumbs={crumbs} />

      <Typography variant="h4" gutterBottom style={{textAlign: 'center'}}>
        Admin - Short URLs
      </Typography>

      <ShortUrlTable />
    </Container>
  );
};
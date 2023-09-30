import { Container, Typography } from '@mui/material';
import { ShortUrlTable } from '../components';

export const ShortUrlsPage = () => (
  <Container>
    <Typography
      id="tableTitle"
      variant="h4"
      gutterBottom
      sx={{ flex: '1 1 100%' }}
    >
      Short URLs
    </Typography>
    <ShortUrlTable />
  </Container>
);
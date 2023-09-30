import {
  Container,
  Typography,
} from '@mui/material';

export const NotFoundPage = () => {
  return (
    <Container style={{ height: '35vh', textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Page Not Found
      </Typography>
    </Container>
  );
};
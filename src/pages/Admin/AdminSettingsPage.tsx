import React from 'react';
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
export const AdminSettingsPage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin - Settings
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="URLs per day" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Something else" />
        </ListItem>
      </List>
    </Container>
  );
};
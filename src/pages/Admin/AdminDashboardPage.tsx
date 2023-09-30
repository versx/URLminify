import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
} from '@mui/material';
import {
  Link as LinkIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

import { Routes } from '../../consts';
import { CardDisplay } from '../../components';
import { ShortUrlService, UserService } from '../../services';
import { ShortUrl, User } from '../../types';

export const AdminDashboardPage = () => {
  const [shortUrls, setShortUrls] = useState<ShortUrl[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    ShortUrlService.getShortUrls().then((response: any) => {
      if (response.status !== 'ok') {
        // TODO: Error
        return;
      }
      setShortUrls(response.shortUrls);
    });
    UserService.getUsers().then((response: any) => {
      if (response.status !== 'ok') {
        // TODO: Error
        return;
      }
      setUsers(response.users);
    });
  }, []);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Admin - Dashboard
      </Typography>
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <CardDisplay
            text="Short URLs"
            icon={<LinkIcon sx={{fontSize: 32}} />}
            value={shortUrls.length.toLocaleString()}
            href={Routes.admin.shortUrls}
          />
        </Grid>
        <Grid item xs={6}>
          <CardDisplay
            text="Users"
            icon={<PersonIcon sx={{fontSize: 32}} />}
            value={users.length.toLocaleString()}
            href={Routes.admin.users}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
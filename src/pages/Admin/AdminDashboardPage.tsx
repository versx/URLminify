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
import { useSnackbar } from 'notistack';

import { Routes } from '../../consts';
import { CardDisplay } from '../../components';
import { ShortUrlService, UserService } from '../../services';
import { ShortUrl, User } from '../../types';

export const AdminDashboardPage = () => {
  const [shortUrls, setShortUrls] = useState<ShortUrl[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    ShortUrlService.getShortUrls().then((response: any) => {
      if (response.status !== 'ok') {
        enqueueSnackbar(`Failed to retrieve short urls with error: ${response.error}.`, { variant: 'error' });
        return;
      }
      setShortUrls(response.shortUrls);
    });
    UserService.getUsers().then((response: any) => {
      if (response.status !== 'ok') {
        enqueueSnackbar(`Failed to retrieve users with error: ${response.error}`, { variant: 'error' });
        return;
      }
      setUsers(response.users);
    });
  }, [enqueueSnackbar]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin - Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <CardDisplay
            text="Short URLs"
            icon={<LinkIcon sx={{fontSize: 48}} />}
            value={shortUrls.length.toLocaleString()}
            href={Routes.admin.shortUrls}
            width="100%"
            height="130px"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardDisplay
            text="Users"
            icon={<PersonIcon sx={{fontSize: 48}} />}
            value={users.length.toLocaleString()}
            href={Routes.admin.users}
            width="100%"
            height="130px"
          />
        </Grid>
      </Grid>
    </Container>
  );
};
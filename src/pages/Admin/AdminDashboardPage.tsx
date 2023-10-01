import React, { useCallback, useEffect, useState } from 'react';
import {
  Container,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  Link as LinkIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';

import { Routes } from '../../consts';
import { CardDisplay, StatTile } from '../../components';
import { ShortUrlService, UserService } from '../../services';
import { ShortUrl, UrlStatsData, User, UserStatsData } from '../../types';

export const AdminDashboardPage = () => {
  const [shortUrls, setShortUrls] = useState<ShortUrl[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [urlStats, setUrlStats] = useState<UrlStatsData>({
    total: 0,
    active: 0,
    expired: 0,
    enabled: 0,
    disabled: 0,
  });
  const [userStats, setUserStats] = useState<UserStatsData>({
    total: 0,
    admins: 0,
    users: 0,
    enabled: 0,
    disabled: 0,
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleSettings = () => window.location.href = Routes.admin.settings;

  const handleReloadStats = useCallback(() => {
    ShortUrlService.getShortUrls().then((response: any) => {
      if (response.status !== 'ok') {
        enqueueSnackbar(`Failed to retrieve short urls with error: ${response.error}.`, { variant: 'error' });
        return;
      }
      const shortUrls = response.shortUrls;
      setShortUrls(shortUrls);
      setUrlStats({
        total: shortUrls.length,
        active: shortUrls.filter((url: any) => new Date(url.expiry) >= new Date()).length,
        expired: shortUrls.filter((url: any) => url.expiry && new Date(url.expiry) < new Date()).length,
        enabled: shortUrls.filter((url: any) => url.enabled).length,
        disabled: shortUrls.filter((url: any) => !url.enabled).length,
      });
    });

    UserService.getUsers().then((response: any) => {
      if (response.status !== 'ok') {
        enqueueSnackbar(`Failed to retrieve users with error: ${response.error}`, { variant: 'error' });
        return;
      }
      const users = response.users;
      setUsers(users);
      setUserStats({
        total: users.length,
        admins: users.filter((user: any) => user.admin).length,
        users: users.filter((user: any) => !user.admin).length,
        enabled: users.filter((user: any) => user.enabled).length,
        disabled: users.filter((user: any) => !user.enabled).length,
      });
    })
  }, [enqueueSnackbar]);

  useEffect(() => handleReloadStats(), [handleReloadStats]);

  return (
    <Container>
      <Tooltip title="Admin Settings">
        <IconButton
          size="large"
          onClick={handleSettings}
          style={{
            display: 'flex',
            float: 'right',
          }}
        >
          <SettingsIcon sx={{fontSize: 36}} />
        </IconButton>
      </Tooltip>
      <Typography variant="h4" gutterBottom>
        Admin - Dashboard
      </Typography>
      <Container component={Paper} elevation={6} style={{ padding: '16px', marginTop: '24px', marginBottom: '24px' }}>
        <Typography variant="h5" gutterBottom style={{textAlign: 'center'}}>
          Overall Statistics
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
      <Container component={Paper} elevation={6} style={{ padding: '16px', marginTop: '24px', marginBottom: '24px' }}>
        <Typography variant="h5" gutterBottom style={{textAlign: 'center'}}>
          Short URL Statistics
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <StatTile title="Total" value={urlStats.total} color="primary.main" elevation={1} />
          </Grid>
          <Grid item xs={6}>
            <StatTile title="Expiring" value={urlStats.active} color="primary.main" elevation={1} />
          </Grid>
          <Grid item xs={6}>
            <StatTile title="Expired" value={urlStats.expired} color="error.main" elevation={1} />
          </Grid>
          <Grid item xs={6}>
            <StatTile title="Enabled" value={urlStats.enabled} color="primary.main" elevation={1} />
          </Grid>
          <Grid item xs={6}>
            <StatTile title="Disabled" value={urlStats.disabled} color="error.main" elevation={1} />
          </Grid>
        </Grid>
      </Container>
      <Container component={Paper} elevation={6} style={{ padding: '16px', marginTop: '24px', marginBottom: '24px' }}>
        <Typography variant="h5" gutterBottom style={{textAlign: 'center'}}>
          User Statistics
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <StatTile title="Total" value={userStats.total} color="primary.main" elevation={1}/>
          </Grid>
          <Grid item xs={6}>
            <StatTile title="Admins" value={userStats.admins} color="primary.main" elevation={1} />
          </Grid>
          <Grid item xs={6}>
            <StatTile title="Users" value={userStats.users} color="primary.main" elevation={1} />
          </Grid>
          <Grid item xs={6}>
            <StatTile title="Enabled" value={userStats.enabled} color="primary.main" elevation={1} />
          </Grid>
          <Grid item xs={6}>
            <StatTile title="Disabled" value={userStats.disabled} color="error.main" elevation={1} />
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};
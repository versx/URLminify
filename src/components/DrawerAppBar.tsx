import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

import { AccountMenu } from '.';
import { Routes } from '../consts';

const Title = 'URLminify';
const DrawerWidth = 240;

const navItems = [
  { text: 'Dashboard', path: Routes.dashboard, requiresAuth: true},
  { text: 'URLs', path: Routes.shortUrls, requiresAuth: true},
  { text: 'Login', path: Routes.login, requiresAuth: false },
  { text: 'Register', path: Routes.register, requiresAuth: false },
];

export const DrawerAppBar = (props: any) => {
  const { children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAuthenticated = Boolean(localStorage.getItem('isAuthenticated'));
  
  const handleDrawerToggle = () => setMobileOpen((prevState) => !prevState);

  const LoginRegisterLinks = () => (
    <>
    <List>
      {navItems.map((item) => ((isAuthenticated && item.requiresAuth) || (!isAuthenticated && !item.requiresAuth)) && (
        <ListItem key={item.path} disablePadding>
          <ListItemButton
            href={item.path}
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
            sx={{ textAlign: 'center' }}
          >
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    {isAuthenticated && (<AccountMenu key="account" />)}
    </>
  );

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <a href={Routes.dashboard} style={{textDecoration: 'none', color: 'inherit'}}>
          {Title}
        </a>
      </Typography>
      <Divider />
      <LoginRegisterLinks />
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'block' } }}
          >
            <a href={Routes.dashboard} style={{textDecoration: 'none', color: 'inherit'}}>
              {Title}
            </a>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <>
                {navItems.map((item) => (
                  ((isAuthenticated && item.requiresAuth) || (!isAuthenticated && !item.requiresAuth)) && (
                  <a key={item.path} href={item.path} style={{textDecoration: 'none', color: 'inherit'}}>
                    <Button key={item.path} sx={{ color: '#fff' }}>
                      {item.text}
                    </Button>
                  </a>
                  )
                ))}
                {isAuthenticated && (<AccountMenu />)}
              </>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DrawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3, w: '100vw' }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
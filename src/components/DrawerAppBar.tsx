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

const Title = 'URLminify';
const DrawerWidth = 240;

const navItems = [{ text: 'Login', path: '/login' }, { text: 'Register', path: '/register' }];

export const DrawerAppBar = (props: any) => {
  const { children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAuthenticated = Boolean(localStorage.getItem('isAuthenticated'));
  
  const handleDrawerToggle = () => setMobileOpen((prevState) => !prevState);

  const LoginRegisterLinks = () => isAuthenticated ? (
    <AccountMenu key="account" />
  ) : (
    <List>
      {navItems.map((item) => (
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
  );

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <a href='/' style={{textDecoration: 'none', color: 'inherit'}}>
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
            <a href='/' style={{textDecoration: 'none', color: 'inherit'}}>
              {Title}
            </a>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {isAuthenticated ? (
              <AccountMenu />
            ) : (
              navItems.map((item) => (
                <a key={item.path} href={item.path} style={{textDecoration: 'none', color: 'inherit'}}>
                  <Button key={item.path} sx={{ color: '#fff' }}>
                    {item.text}
                  </Button>
                </a>
              ))
            )}
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
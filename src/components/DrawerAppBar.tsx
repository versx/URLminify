import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  ArrowDropDown as ArrowDropDownIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  Dashboard as DashboardIcon,
  Link as LinkIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

import { AccountMenu, AdminDropdown, DropdownItem } from '.';
import { Routes } from '../consts';
import { ColorModeContext } from '../contexts';
import { get } from '../modules';
import { getUserToken } from '../stores';
import { User } from '../types';

const Title = 'URLminify';
const DrawerWidth = 240;

const navItems: DropdownItem[] = [
  { text: 'Dashboard', path: Routes.dashboard, requiresAuth: true },
  { text: 'URLs', path: Routes.shortUrls, requiresAuth: true },
  { text: 'Login', path: Routes.login, requiresAuth: false },
  { text: 'Register', path: Routes.register, requiresAuth: false },
];

const adminItems: DropdownItem[] = [
  { text: 'Dashboard', path: Routes.admin.dashboard, icon: <DashboardIcon /> },
  { text: 'Short URLs', path: Routes.admin.shortUrls, icon: <LinkIcon /> },
  { text: 'Users', path: Routes.admin.users, icon: <PersonIcon /> },
  { text: 'divider', path: 'divider' },
  { text: 'Settings', path: Routes.admin.settings, icon: <SettingsIcon /> },
];

export const DrawerAppBar = (props: any) => {
  const { children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  
  const currentUser = getUserToken() as User;
  const isAuthenticated = Boolean(get('isAuthenticated'));
  const isAdmin = Boolean(currentUser?.admin);
  
  const handleOpenAdminMenu = (event: any) => {
    event.stopPropagation(); // Stop the event propagation
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAdminMenu = () => setAnchorEl(null);

  const handleDrawerToggle = () => setMobileOpen((prevState) => !prevState);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, justifyContent: 'center' }}>
        <a
          href={Routes.dashboard}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <img
            src="/logo192.png"
            alt="URLminify Logo"
            style={{
              height: 28,
              width: 28,
              marginRight: '10px',
            }}
          />
          {Title}
        </a>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => isAuthenticated && item.requiresAuth && (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              href={item.path}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                textAlign: 'center',
              }}
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        {isAdmin && (
          <ListItem key='admin' disablePadding>
            <ListItemButton
              aria-controls="admin-menu"
              aria-haspopup="true"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                textAlign: 'center',
                justifyContent: 'center',
              }}
              onClick={handleOpenAdminMenu}
            >
              Admin
              <ArrowDropDownIcon />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <AppBar component="nav">
        <Toolbar>
          <Tooltip title="Toggle navigation drawer" arrow>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>

          <img
            src="/logo192.png"
            alt="URLminify Logo"
            style={{
              height: 28,
              width: 28,
              marginRight: '10px',
            }}
          />
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
              {isAdmin && (
                <Tooltip title="Admin Dashboard" arrow>
                  <IconButton
                    aria-controls="admin-menu"
                    aria-haspopup="true"
                    sx={{ color: '#fff' }}
                    onClick={handleOpenAdminMenu}
                  >
                    <AdminPanelSettingsIcon />
                  </IconButton>
                </Tooltip>
              )}
            </>
          </Box>
          <Tooltip title="Toggle light/dark theme" arrow>
            <IconButton
              color="inherit"
              sx={{ ml: 1 }}
              onClick={colorMode.toggleColorMode}
            >
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
          {isAuthenticated && (<AccountMenu />)}
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
      {isAdmin && (
        <AdminDropdown
          isAdmin={isAdmin}
          open={anchorEl}
          items={adminItems}
          onClose={handleCloseAdminMenu}
        />
      )}
    </Box>
  );
};
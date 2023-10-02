import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  ArrowDropDown as ArrowDropDownIcon,
  Dashboard as DashboardIcon,
  Link as LinkIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

import { AccountMenu, AdminDropdown, DropdownItem, SidebarDrawer } from '.';
import { ActiveMenuItemColor, DrawerWidth, Routes, StorageKeys, Title } from '../consts';
import { get, set } from '../modules';
import { getUserToken } from '../stores';
import { User } from '../types';

const NavItems: DropdownItem[] = [
  { text: 'Dashboard', path: Routes.dashboard, requiresAuth: true, icon: <DashboardIcon />, tooltip: 'Dashboard' },
  { text: 'URLs', path: Routes.shortUrls, requiresAuth: true, icon: <LinkIcon />, tooltip: 'Short URLs' },
  { text: 'Login', path: Routes.login, requiresAuth: false, icon: <PersonIcon />, tooltip: 'Login' },
  { text: 'Register', path: Routes.register, requiresAuth: false, icon: <PersonIcon />, tooltip: 'Register' },
];

const AdminItems: DropdownItem[] = [
  { text: 'Dashboard', path: Routes.admin.dashboard, icon: <AdminPanelSettingsIcon />, tooltip: 'Admin Dashboard' },
  { text: 'Short URLs', path: Routes.admin.shortUrls, icon: <LinkIcon />, tooltip: 'Admin Short URLs Dashboard' },
  { text: 'Users', path: Routes.admin.users, icon: <PersonIcon />, tooltip: 'Admin User Accounts Dashboard' },
  { text: 'divider', path: 'divider' },
  { text: 'Settings', path: Routes.admin.settings, icon: <SettingsIcon />, tooltip: 'Admin Settings' },
];

export const DrawerAppBar = (props: any) => {
  const { children } = props;

  const cachedAdminOpen = get(StorageKeys.AdminOpen, false);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(cachedAdminOpen);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const currentUser = getUserToken() as User;
  const isAuthenticated = Boolean(get('isAuthenticated'));
  const isAdmin = Boolean(currentUser?.admin);
  
  const handleOpenAdminMenu = (event: any) => {
    event.stopPropagation(); // Stop the event propagation
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAdminMenu = () => setAnchorEl(null);

  const handleToggleAdminMenu = (event: any) => {
    event.stopPropagation();
    set(StorageKeys.AdminOpen, !adminOpen);
    setAdminOpen((prev: boolean) => !prev);
  };

  const handleDrawerToggle = () => setMobileOpen((prevState) => !prevState);

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
              {NavItems.map((item: DropdownItem, index: number) =>
                (((isAuthenticated && item.requiresAuth) || (!isAuthenticated && !item.requiresAuth)) && (
                <Tooltip
                  arrow
                  key={index}
                  title={item.tooltip ?? item.text}
                >
                  <a href={item.path} style={{textDecoration: 'none', color: 'inherit'}}>
                    <Button
                      style={{
                        textDecoration: 'none',
                        color: item.path === window.location.pathname ? ActiveMenuItemColor : 'inherit',
                      }}
                    >
                      {item.text}
                    </Button>
                  </a>
                </Tooltip>
              )))}
              {isAdmin && (
                <Tooltip title="Admin Dashboard" arrow>
                  <IconButton
                    aria-controls="admin-menu"
                    aria-haspopup="true"
                    sx={{ color: '#fff' }}
                    onClick={handleOpenAdminMenu}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AdminPanelSettingsIcon />
                      <ArrowDropDownIcon sx={{ fontSize: '1rem', ml: 0.5 }} />
                    </Box>
                  </IconButton>
                </Tooltip>
              )}
            </>
          </Box>
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
          <SidebarDrawer
            adminOpen={adminOpen}
            navItems={NavItems}
            adminItems={AdminItems}
            onToggleAdminMenu={handleToggleAdminMenu}
            onToggleDrawer={handleDrawerToggle}
          />
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
          items={AdminItems}
          onClose={handleCloseAdminMenu}
        />
      )}
    </Box>
  );
};
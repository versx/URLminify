import { ChangeEvent } from 'react';
import {
  Box,
  Container,
  FormControlLabel,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';

import { BreadcrumbItem, Breadcrumbs, IOSSwitch } from '../../components';
import {
  DefaultEnableRegistration, DefaultEnableTelemetry,
  DefaultMaxSlugLimit, SettingKeys,
} from '../../consts';
import { useServerSettings } from '../../hooks';

const crumbs: BreadcrumbItem[] = [{
  text: 'Dashboard',
  href: '/',
  selected: false,
},{
  text: 'Admin',
  href: '/admin',
  selected: false,
},{
  text: 'Settings',
  href: '/admin/settings',
  selected: true,
}];

const useStyles = (theme: Theme) => ({
  element: {
    marginBottom: 15,
  },
  root: {
    height: '35vh',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    
    border: '1px solid grey',
  },
  inputContainer: {
    padding: '20px',
    justifyContent: 'center',
  },
});

export const AdminSettingsPage = () => {
  const { settings, setSetting } = useServerSettings();
  const theme = useTheme();
  const classes = useStyles(theme);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target: { name, type, checked, value } } = event;
    const newValue = type === 'checkbox' ? checked : value;
    setSetting(name, newValue);
  };

  return (
    <Container style={classes.root}>
      <Breadcrumbs crumbs={crumbs} />
      <Typography variant="h4" gutterBottom align="center">
        Admin - Settings
      </Typography>

      <Box component={Paper} elevation={0} sx={classes.container}>
        <div style={classes.inputContainer}>
          <Tooltip
            arrow
            title="Maximum number of URL slugs a user can create."
          >
            <TextField
              fullWidth
              name={SettingKeys.MaxSlugLimit}
              label="Max Slug Limit Per User"
              variant="outlined"
              type="number"
              value={settings
                ? parseInt(settings[SettingKeys.MaxSlugLimit])
                : DefaultMaxSlugLimit
              }
              onChange={handleChange}
              InputProps={{ inputProps: { min: 0 } }} // Ensure non-negative numbers
              style={classes.element}
            />
          </Tooltip>
          <Tooltip
            arrow
            title="Allow users to register new accounts."
          >
            <FormControlLabel
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  name={SettingKeys.EnableRegistration}
                  checked={settings
                    ? parseInt(settings[SettingKeys.EnableRegistration]) !== 0
                    : DefaultEnableRegistration
                  }
                  onChange={handleChange}
                />
              }
              label="Enable User Registration"
              style={classes.element}
            />
          </Tooltip>
          <br />
          <Tooltip
            arrow
            title="Save telemetry data of users that visit short URL slugs."
          >
            <FormControlLabel
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  name={SettingKeys.EnableTelemetry}
                  checked={settings
                    ? parseInt(settings[SettingKeys.EnableTelemetry]) !== 0
                    : DefaultEnableTelemetry
                  }
                  onChange={handleChange}
                />
              }
              label="Save Telemetry Data"
              style={classes.element}
            />
          </Tooltip>
        </div>
      </Box>
    </Container>
  );
};
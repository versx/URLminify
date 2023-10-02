import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';

import {
  DefaultEnableRegistration, DefaultEnableTelemetry,
  DefaultMaxSlugLimit, SettingKeys,
} from '../../consts';
import { BreadcrumbItem, Breadcrumbs, IOSSwitch } from '../../components';
import { SettingsService } from '../../services';
import { getUserToken } from '../../stores';
import { Setting } from '../../types';

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

export const AdminSettingsPage = () => {
  const [slugLimit, setSlugLimit] = useState(DefaultMaxSlugLimit);
  const [enableRegistration, setEnableRegistration] = useState(DefaultEnableRegistration);
  const [enableTelemetry, setEnableTelemetry] = useState(DefaultEnableTelemetry);
  const { enqueueSnackbar } = useSnackbar();
  const currentUser = getUserToken();

  const handleSubmit = async (event: FormEvent, newLimit: number) => {
    const response = await SettingsService.setSettings([
      { name: SettingKeys.MaxSlugLimit, value: newLimit },
      { name: SettingKeys.EnableRegistration, value: enableRegistration },
      { name: SettingKeys.EnableTelemetry, value: enableTelemetry },
    ]);
    if (response.status !== 'ok') {
      enqueueSnackbar(`Failed to update settings.`, { variant: 'error' });
      return;
    }

    enqueueSnackbar(`Settings updated successfully.`, { variant: 'success' });
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newLimit = parseInt(event.target.value, 10);
    if (isNaN(newLimit) || newLimit < 0) {
      newLimit = 0;
    }
    
    setSlugLimit(newLimit);
  };

  const handleReloadSettings = useCallback(() => {
    if (!currentUser?.admin) {
      return;
    }
    SettingsService.getSettings().then((response: any) => {
      if (response.status !== 'ok') {
        enqueueSnackbar(`Failed to reload settings.`, { variant: 'error' });
        return;
      }
      const enableRegistrationSetting = response.settings.find((setting: Setting) => setting.name === SettingKeys.EnableRegistration);
      setEnableRegistration(parseInt(enableRegistrationSetting?.value) !== 0 ?? DefaultEnableRegistration);
      const slugLimitSetting = response.settings.find((setting: Setting) => setting.name === SettingKeys.MaxSlugLimit);
      setSlugLimit(slugLimitSetting?.value ?? DefaultMaxSlugLimit);
    });
  }, [currentUser?.admin, enqueueSnackbar]);

  useEffect(() => handleReloadSettings(), [handleReloadSettings]);

  return (
    <Container style={{ height: '35vh' }}>

      <Breadcrumbs crumbs={crumbs} />
      <Typography variant="h4" gutterBottom style={{textAlign: 'center'}}>
        Admin - Settings
      </Typography>

      <Box component={Paper} elevation={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
        <div style={{ padding: '20px', justifyContent: 'center' }}>
          <form onSubmit={(e) => handleSubmit(e, slugLimit)}>
            <Tooltip title="Maximum number of URL slugs a user can create." arrow>
              <TextField
                fullWidth
                label="Max Slug Limit Per User"
                variant="outlined"
                type="number"
                value={slugLimit}
                onChange={handleLimitChange}
                InputProps={{ inputProps: { min: 0 } }} // to ensure non-negative numbers
                style={{
                  marginBottom: 15,
                }}
              />
            </Tooltip>
            <Tooltip title="Allow users to register new accounts." arrow>
            <FormControlLabel
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  checked={enableRegistration}
                  onChange={(e => setEnableRegistration(e.target.checked))}
                />
              }
              label="Enable User Registration"
              style={{
                marginBottom: 15,
              }}
            />
            </Tooltip>
            <br />
            <Tooltip title="Save telemetry data of users that visit short URL slugs." arrow>
              <FormControlLabel
                control={
                  <IOSSwitch
                    sx={{ m: 1 }}
                    checked={enableTelemetry}
                    onChange={(e => setEnableTelemetry(e.target.checked))}
                  />
                }
                label="Save Telemetry Data"
                style={{
                  marginBottom: 15,
                }}
              />
            </Tooltip>
            <br />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
            >
              Save
            </Button>
          </form>
        </div>
      </Box>
    </Container>
  );
};
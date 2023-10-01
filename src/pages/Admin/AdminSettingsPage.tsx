import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';

import { DefaultEnableRegistration, DefaultMaxSlugLimit, SettingKeys } from '../../consts';
import { IOSSwitch } from '../../components';
import { SettingsService } from '../../services';
import { getUserToken } from '../../stores';
import { Setting } from '../../types';

export const AdminSettingsPage = () => {
  const [slugLimit, setSlugLimit] = useState(DefaultMaxSlugLimit);
  const [enableRegistration, setEnableRegistration] = useState(DefaultEnableRegistration);
  const { enqueueSnackbar } = useSnackbar();
  const currentUser = getUserToken();

  const handleSubmit = async (event: FormEvent, newLimit: number) => {
    const response = await SettingsService.setSettings([
      { name: SettingKeys.MaxSlugLimit, value: newLimit },
      { name: SettingKeys.EnableRegistration, value: enableRegistration },
    ]);
    if (response.status !== 'ok') {
      enqueueSnackbar(`Failed to update setting.`, { variant: 'error' });
      return;
    }

    enqueueSnackbar(`Setting updated successfully.`, { variant: 'success' });
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
      <Typography variant="h4" gutterBottom style={{textAlign: 'center'}}>
        Admin - Settings
      </Typography>
      <Box component={Paper} elevation={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
        <div style={{ padding: '20px', justifyContent: 'center' }}>
          <form onSubmit={(e) => handleSubmit(e, slugLimit)}>
            <TextField
              fullWidth
              label="Max URL Slug Limit Per User"
              variant="outlined"
              type="number"
              value={slugLimit}
              onChange={handleLimitChange}
              InputProps={{ inputProps: { min: 0 } }} // to ensure non-negative numbers
              style={{
                marginBottom: 15,
              }}
            />
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
            <br />
            <Button
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
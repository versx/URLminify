import React, { useCallback, useEffect, useState } from 'react';
import {
  Container,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';

import { SettingKeys } from '../../consts';
import { SlugLimitSetter } from '../../components';
import { SettingsService } from '../../services';
import { SettingModel } from '../../types';

export const AdminSettingsPage = () => {
  const [slugLimit, setSlugLimit] = useState(500);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (newLimit: number) => {
    const response = await SettingsService.setSetting(SettingKeys.MaxSlugLimit, newLimit);
    if (response.status !== 'ok') {
      enqueueSnackbar(`Failed to update setting.`, { variant: 'error' });
      return;
    }

    enqueueSnackbar(`Setting updated successfully.`, { variant: 'success' });
  };

  const handleReloadSettings = useCallback(() => {
    SettingsService.getSettings().then((response: any) => {
      if (response.status !== 'ok') {
        enqueueSnackbar(`Failed to reload settings.`, { variant: 'error' });
        return;
      }
      const slugLimitSetting = response.settings.find((setting: SettingModel) => setting.name === 'daily_slug_limit');
      setSlugLimit(slugLimitSetting.value);
    });
  }, [enqueueSnackbar]);

  useEffect(() => handleReloadSettings(), [handleReloadSettings]);

  return (
    <Container style={{ height: '35vh' }}>
      <Typography variant="h4" gutterBottom>
        Admin - Settings
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '20px', justifyContent: 'center', alignItems: 'center' }}>
        <SlugLimitSetter
          limit={slugLimit}
          onLimitChange={setSlugLimit}
          onSubmit={handleSubmit}
        />
      </div>
    </Container>
  );
};
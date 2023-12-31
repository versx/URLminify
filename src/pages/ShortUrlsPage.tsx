import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Container,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';

import { DefaultMaxSlugLimit, SettingKeys } from '../consts';
import {
  QuotaRemaining,
  ShortUrlTable,
  UrlStats,
} from '../components';
import { SettingsService, ShortUrlService } from '../services';
import { getUserToken } from '../stores';
import { Setting, UrlStatsData } from '../types';

export const ShortUrlsPage = () => {
  const [stats, setStats] = useState<UrlStatsData>({
    total: 0,
    active: 0,
    expired: 0,
    enabled: 0,
    disabled: 0,
  });
  const slugLimitRef = useRef(DefaultMaxSlugLimit);
  const { enqueueSnackbar } = useSnackbar();
  const currentUser = getUserToken();

  const handleReloadStats = useCallback(() => {
    ShortUrlService.getShortUrls(currentUser?.id).then((response: any) => {
      if (response.status !== 'ok') {
        enqueueSnackbar('Error occurred reloading short URL statistics.', { variant: 'error' });
        return;
      }
      const shortUrls = response.shortUrls;
      const total = shortUrls.length;
      const active = shortUrls.filter((url: any) => new Date(url.expiry) >= new Date()).length;
      const expired = shortUrls.filter((url: any) => url.expiry && new Date(url.expiry) < new Date()).length;
      const enabled = shortUrls.filter((url: any) => url.enabled).length;
      const disabled = shortUrls.filter((url: any) => !url.enabled).length;
      setStats({
        total,
        active,
        expired,
        enabled,
        disabled,
      });
    });

    SettingsService.getSettings().then((response: any) => {
      if (response.status !== 'ok') {
        enqueueSnackbar(`Failed to fetch settings.`, { variant: 'error' });
        return;
      }
      const slugLimitSetting = response.settings.find((setting: Setting) => setting.name === SettingKeys.MaxSlugLimit);
      slugLimitRef.current = slugLimitSetting?.value ?? DefaultMaxSlugLimit;
    });
  }, [currentUser?.id, enqueueSnackbar]);

  useEffect(() => handleReloadStats(), [handleReloadStats]);

  return (
    <Container>
      <Typography
        id="tableTitle"
        variant="h4"
        gutterBottom
        sx={{ flex: '1 1 100%' }}
        style={{textAlign: 'center'}}
      >
        Short URLs
      </Typography>

      <QuotaRemaining
        used={stats.total}
        total={slugLimitRef.current}
      />

      <UrlStats
        title="Short URL Statistics"
        data={stats}
      />

      <ShortUrlTable />
    </Container>
  );
};
import {
  Grid,
  Typography,
} from '@mui/material';

import { StatTile } from '.';
import { UrlStatsData } from '../types';

interface UrlStatsProps {
  title: string;
  data: UrlStatsData;
};

export const UrlStats = (props: UrlStatsProps) => {
  const { title, data } = props;

  return (
    <div style={{ padding: '16px' }}>
      <Typography variant="h5" gutterBottom style={{textAlign: 'center'}}>
        {title}
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12}>
          <StatTile title="Total" value={data.total} color="textSecondary" />
        </Grid>
        <Grid item xs={6}>
          <StatTile title="Expiring" value={data.active} color="textSecondary" />
        </Grid>
        <Grid item xs={6}>
          <StatTile title="Expired" value={data.expired} color="error" />
        </Grid>
        <Grid item xs={6}>
          <StatTile title="Enabled" value={data.enabled} color="textSecondary" />
        </Grid>
        <Grid item xs={6}>
          <StatTile title="Disabled" value={data.disabled} color="error" />
        </Grid>
      </Grid>
    </div>
  );
};
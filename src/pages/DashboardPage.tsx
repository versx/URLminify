import React, { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
} from 'recharts';
import { useSnackbar } from 'notistack';

import { ShortUrlService } from '../services';
import { getUserToken } from '../stores';

interface ShortUrlData {
  slug: string;
  visits: number;
};

// Colors for our pie slices
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A3E4D7', '#D4E157', '#81C784', '#64B5F6', '#BA68C8', '#E57373'];

export const DashboardPage = () => {
  const [stats, setStats] = useState<ShortUrlData[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const currentUser = getUserToken();

  useEffect(() => {
    ShortUrlService.getTopShortUrlStats(currentUser?.id).then((response: any) => {
      if (response.status !== 'ok') {
        enqueueSnackbar('Failed to get dashboard statistics for your account.', { variant: 'error' });
        return;
      }

      setStats(response.stats);
    });
  }, [currentUser?.id, enqueueSnackbar]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Paper style={{ display: 'flex', padding: '20px', marginBottom: '20px', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Total Visits
        </Typography>
        {/*
        <LineChart width={600} height={300} data={stats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="slug" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="visits" stroke="#8884d8" />
        </LineChart>
        */}
        <PieChart width={400} height={400}>
          <Pie
            data={stats}
            dataKey="visits"
            nameKey="slug"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label={(entry) => entry.slug}
          >
            {stats.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </Paper>

      <Paper style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Top 5 Visited Short URLs
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>URL Slug</TableCell>
              <TableCell>Visits</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stats.map((stat: ShortUrlData) => (
              <TableRow key={stat.slug}>
                <TableCell><strong>{stat.slug}</strong></TableCell>
                <TableCell>{stat.visits.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};
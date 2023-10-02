import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import {
  Visibility as ViewIcon,
  Delete as DeleteIcon,
  Print as PrintIcon,
} from '@mui/icons-material';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridToolbar,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Title,
  Tooltip,
} from 'chart.js';
import { useSnackbar } from 'notistack';

import { BreadcrumbItem, Breadcrumbs, PieChart } from '../../components';
import { ViewTelemetryDetailsDialog } from '../../dialogs';
import { aggregateData, parseUserAgent, toObject } from '../../modules';
import { TelemetryService } from '../../services';
import { Telemetry } from '../../types';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 50, hideable: false },
  {
    field: 'slug',
    headerName: 'Slug',
    width: 70,
    hideable: false,
  },
  {
    field: 'ipAddr',
    headerName: 'IP Address',
    width: 110,
  },
  {
    field: 'isp',
    headerName: 'ISP',
    width: 150,
  },
  {
    field: 'browser',
    headerName: 'Browser',
    width: 130,
    valueGetter: (params: GridValueGetterParams) => parseUserAgent(params.row.browser).browser.name,
  },
  //{
  //  field: 'referrer',
  //  headerName: 'Referrer',
  //  width: 120,
  //},
  //{
  //  field: 'forwardedFor',
  //  headerName: 'Forwarded For',
  //  width: 100,
  //},
  {
    field: 'language',
    headerName: 'Language',
    width: 120,
  },
  {
    field: 'continent',
    headerName: 'Continent',
    width: 120,
  },
  {
    field: 'country',
    headerName: 'Country',
    width: 120,
  },
  {
    field: 'regionName',
    headerName: 'Region',
    width: 100,
  },
  {
    field: 'city',
    headerName: 'City',
    width: 100,
  },
  {
    field: 'zip',
    headerName: 'Zip Code',
    width: 75,
  },
  {
    field: 'timezone',
    headerName: 'Time Zone',
    width: 150,
  },
  {
    field: 'offset',
    headerName: 'Offset',
    width: 50,
    type: 'number',
  },
  {
    field: 'currency',
    headerName: 'Currency',
    width: 70,
  },
  {
    field: 'org',
    headerName: 'Organization',
    width: 120,
  },
  {
    field: 'as',
    headerName: 'AS',
    width: 150,
  },
  {
    field: 'reverse',
    headerName: 'Reverse DNS',
    width: 130,
  },
  {
    field: 'mobile',
    headerName: 'Mobile',
    width: 65,
    type: 'boolean',
  },
  {
    field: 'proxy',
    headerName: 'Proxy',
    width: 65,
    type: 'boolean',
  },
  {
    field: 'hosting',
    headerName: 'Hosting',
    width: 65,
    type: 'boolean',
  },
  {
    field: 'createdAt',
    headerName: 'Created',
    width: 175,
    type: 'dateTime',
    valueGetter: (params: GridValueGetterParams) => new Date(params.row.createdAt),
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 120,
    type: 'actions',
    getActions: ({ row}: GridRowParams) => [
      <GridActionsCellItem
        icon={<ViewIcon color="info" />}
        label="View"
        onClick={() => console.log('view:', row)}
      />,
      <GridActionsCellItem
        icon={<DeleteIcon color="error" />}
        label="Delete"
        onClick={() => console.log('delete:', row)}
      />,
      <GridActionsCellItem icon={<PrintIcon />}
        showInMenu
        label="Print"
        onClick={() => console.log('print:', row)}
      />,
    ],
  },
];

const crumbs: BreadcrumbItem[] = [{
  text: 'Dashboard',
  href: '/',
  selected: false,
},{
  text: 'Admin',
  href: '/admin',
  selected: false,
},{
  text: 'Telemetry',
  href: '/admin/telemetry',
  selected: true,
}];

export const AdminTelemetryPage = () => {
  const [telemetryData, setTelemetryData] = useState<Telemetry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  ChartJS.register(ArcElement, Legend, Title, Tooltip);

  const handleRowClick = (param: GridRowParams) => {
    setSelectedRow(param.row);
    setOpen(true);
  };

  useEffect(() => {
    TelemetryService.getTelemetry().then((response: any) => {
      if (response.status !== 'ok') {
        enqueueSnackbar(`Failed to fetch telemetry data with error: ${response.error}`, { variant: 'error' });
        return;
      }
      setTelemetryData(response.telemetry);
      setIsLoading(false);
    });
  }, [enqueueSnackbar]);

  const userAgents = aggregateData(telemetryData, 'browser' as keyof Telemetry);
  const browsers = toObject(Object.keys(userAgents).map((ua: any) => ({ [parseUserAgent(ua).browser.name]: userAgents[ua] })));
  const systems = toObject(Object.keys(userAgents).map((ua: any) => ({ [parseUserAgent(ua).platform.name]: userAgents[ua] })));
  const devices = aggregateData(telemetryData, 'mobile' as keyof Telemetry);
  const countries = aggregateData(telemetryData, 'country' as keyof Telemetry);
  const isps = aggregateData(telemetryData, 'isp' as keyof Telemetry);
  const slugs = aggregateData(telemetryData, 'slug' as keyof Telemetry);

  return (
    <Container style={{ height: '35vh' }}>
      <Breadcrumbs crumbs={crumbs} />
      <Typography variant="h4" gutterBottom style={{textAlign: 'center'}}>
        Admin - Telemetry
      </Typography>

      <Box component={Paper} elevation={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, border: '1px solid grey' }}>
        <Grid container spacing={2} style={{ padding: '20px', justifyContent: 'center' }}>
          <Grid item xs={12} sm={6} md={4}>
            <PieChart
              data={Object.values(systems)}
              labels={Object.keys(systems)}
              title="Operating System"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <PieChart
              data={Object.values(browsers)}
              labels={Object.keys(browsers)}
              title="Web Browser"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <PieChart
              data={Object.values(devices)}
              labels={Object.keys(devices).map(device => device === 'true' ? 'Mobile' : 'Desktop')}
              title="Device"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <PieChart
              data={Object.values(countries)}
              labels={Object.keys(countries)}
              title="Country"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <PieChart
              data={Object.values(isps)}
              labels={Object.keys(isps)}
              title="ISP" //"Internet Service Provider"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <PieChart
              data={Object.values(slugs)}
              labels={Object.keys(slugs)}
              title="URL Slugs"
            />
          </Grid>
        </Grid>

        <br />

        <Box sx={{ width: '100%' }}>
          <Typography variant="h6" gutterBottom style={{textAlign: 'center'}}>
            Telemetry Data
          </Typography>
          <DataGrid
            autoHeight
            loading={isLoading}
            rows={telemetryData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 25,
                },
              },
            }}
            pageSizeOptions={[5, 10, 25, 50, 100, { label: 'All', value: 100 }]}
            checkboxSelection
            //disableRowSelectionOnClick
            slots={{
              toolbar: GridToolbar,
              //row: renderRowTooltip,
            }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
            onRowClick={handleRowClick}
          />

          <ViewTelemetryDetailsDialog
            open={open}
            selectedRow={selectedRow}
            setOpen={setOpen}
          />
        </Box>
      </Box>
    </Container>
  );
};

//const renderRowTooltip = (row: any) => {
//  console.log('row:', row);
//  return (
//    <MuiTooltip title={`Details for ${row.col1}: More Info Here`} enterDelay={500}>
//      {row.row.slug}
//    </MuiTooltip>
//  );
//};
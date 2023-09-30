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

type RouteParamInfo = {
  name: string;
  type: string;
  description: string;
};

type RouteInfo = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  parameters?: Array<RouteParamInfo>;
  response?: string;
};

const API_ROUTES: RouteInfo[] = [
  {
    method: 'GET',
    path: '/api/v1/users/:id',
    description: 'Retrieve a user account object by ID.',
    parameters: [
      { name: 'id', type: 'string', description: 'The ID of the user account.' },
    ],
    response: 'The user account object',
  },
  {
    method: 'GET',
    path: '/api/v1/users',
    description: 'Retrieve a list of all user accounts.',
    response: 'Array of user account objects',
  },
  {
    method: 'POST',
    path: '/api/v1/users',
    description: 'Create a new user account.',
    parameters: [
      { name: 'username', type: 'string', description: 'The desired username.' },
      { name: 'password', type: 'string', description: 'The desired password.' },
    ],
    response: 'The created user account object',
  },
  {
    method: 'PUT',
    path: '/api/v1/users',
    description: 'Updates an existing user account.',
    parameters: [
      { name: 'username', type: 'string', description: 'The desired username.' },
      { name: 'password', type: 'string', description: 'The desired password.' },
    ],
    response: 'The updated user account object',
  },
  {
    method: 'DELETE',
    path: '/api/v1/users',
    description: 'Delets a user account.',
    parameters: [
      { name: 'userId', type: 'number', description: 'The account ID of the user to delete.' },
    ],
    response: 'The result of deleting the user account',
  },
  {
    method: 'GET',
    path: '/api/v1/users/:id/password/reset',
    description: 'Reset a user\'s account password.',
    parameters: [
      { name: 'id', type: 'string', description: 'The ID of the user account.' },
    ],
    response: 'The user account object',
  },
  {
    method: 'GET',
    path: '/api/v1/users/:id/key/reset',
    description: 'Reset a user\'s API key.',
    parameters: [
      { name: 'id', type: 'string', description: 'The ID of the user account.' },
    ],
    response: 'The user account object',
  },
  {
    method: 'GET',
    path: '/:slug',
    description: 'Redirects to the destination URL for the given slug.',
    parameters: [
      { name: 'slug', type: 'string', description: 'The name of the redirect slug.' },
    ],
    response: 'The created short URL',
  },
  {
    method: 'GET',
    path: '/api/v1/shorturls/create',
    description: 'Creates a new short URL.',
    parameters: [
      { name: 'userId', type: 'number', description: '' },
    ],
    response: 'The created short URL',
  },
  {
    method: 'GET',
    path: '/api/v1/shorturls/stats',
    description: 'Retrieves overall statistics of current data entities.',
    parameters: [
    ],
    response: 'Short URL and User statistics',
  },
  {
    method: 'GET',
    path: '/api/v1/shorturls',
    description: 'Retrieve a list of all short URLs.',
    parameters: [
      { name: 'pretty', type: 'boolean', description: 'Optional: Pretty print the JSON response.' },
      { name: 'userId', type: 'number', description: 'Optional: User ID of short URLs to fetch, otherwise all are returned.' },
    ],
    response: 'Short URLs list',
  },
  {
    method: 'POST',
    path: '/api/v1/shorturls',
    description: 'Creates a new short URL.',
    parameters: [
      { name: 'userId', type: 'number', description: '' },
    ],
    response: 'The created short URL',
  },
  {
    method: 'PUT',
    path: '/api/v1/shorturls',
    description: 'Updates a user\'s short URL.',
    parameters: [
      { name: 'userId', type: 'number', description: 'User ID of short URLs to update.' },
    ],
    response: 'The updated short URL',
  },
  {
    method: 'DELETE',
    path: '/api/v1/shorturls',
    description: 'Deletes a user\'s short URL.',
    parameters: [
      { name: 'userId', type: 'number', description: 'User ID of short URL to delete.' },
    ],
    response: 'The result of deleting the short URL',
  },
];

export const ApiDocumentationPage = () => {
  return (
    <Container sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        API Documentation
      </Typography>
      {API_ROUTES.map((route, index) => (
        <Paper elevation={3} style={{ margin: '20px 0', padding: '20px' }} key={index}>
          <Typography variant="h6">
            {route.method} {route.path}
          </Typography>
          <Typography variant="body1">{route.description}</Typography>
          {route.parameters && (
            <>
              <Typography variant="subtitle1" style={{ marginTop: '10px' }}>
                Parameters:
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {route.parameters.map((param, paramIndex) => (
                    <TableRow key={paramIndex}>
                      <TableCell>{param.name}</TableCell>
                      <TableCell>{param.type}</TableCell>
                      <TableCell>{param.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
          {route.response && (
            <Typography variant="subtitle1" style={{ marginTop: '10px' }}>
              Response: {route.response}
            </Typography>
          )}
        </Paper>
      ))}
    </Container>
  );
};
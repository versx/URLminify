import { RouteInfo } from './types';

export const DefaultEnableRegistration = true;
export const DefaultEnableTelemetry = true;
export const DefaultMaxSlugLimit = 1000;

export const SettingKeys = {
  EnableRegistration: 'enable_registration',
  EnableTelemetry: 'enable_telemetry',
  MaxSlugLimit: 'max_slug_limit',
};

export const Routes = {
  dashboard: '/',
  slugs: '/:slug',
  shortUrls: '/urls',
  settings: '/settings',
  login: '/login',
  register: '/register',
  apiDocs: '/api-docs',
  admin: {
    dashboard: '/admin',
    shortUrls: '/admin/urls',
    users: '/admin/users',
    settings: '/admin/settings',
  },
};

export const ApiRoutes: RouteInfo[] = [
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
    description: 'Deletes a user account.',
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
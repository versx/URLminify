import axios from 'axios';

import config from '../config.json';

export const http = axios.create({
  baseURL: config.api.url,
  headers: {
    'Content-Type': 'application/json',
    'x-access-token': config.api.key,
  },
  withCredentials: true,
});
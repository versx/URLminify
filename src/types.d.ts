import { Dialect, Sequelize } from 'sequelize';

export type Config = {
  host: string;
  port: number;
  domain: string;
  auth: {
    admin: {
      username: string;
      password: string;
    };
    secret: string;
  };
  database: {
    dialect: Dialect;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    timezone: string;
  };
  logs: {
    level: LogLevel;
    colors: {
      [type: ColorType]: string;
    };
  };
};

export type SequelizeDatabaseConnection = {
  connection: Sequelize;
  shortUrl?: Model;
  user?: Model;
};

export type CreateShortUrlRequest = {
  url: string;
  name?: string;
  userId: number;
};

export type CreateShortUrlResponse = {
  status: Status;
  error?: string;
  shortUrl?: {
    slug: string;
    url: string;
    userId: number;
  };
  originalUrl: string;
};

export type UpdateShortUrlRequest = {
  url: string;
  //userId: number;
};

export type UpdateShortUrlResponse = {
  status: Status;
  error?: string;
  shortUrl?: {
    slug: string;
    url: string;
    userId: number;
  };
  originalUrl: string;
};

export type ShortUrlModel = {
  slug: string;
  originalUrl: string;
  userId: number;
  visits: number;

  createdAt?: Date;
  deletedAt?: Date;
  updatedAt?: Date;
};

export type UserModel = {
  id?: number;
  username: string;
  password: string;
  apiKey?: string;
  enabled?: boolean;
  admin?: boolean;

  accessToken?: string;
  refreshToken?: string;

  createdAt?: Date;
  deletedAt?: Date;
  updatedAt?: Date;
};

export type Status = 'ok' | 'error';

export type ColorType = 'text' | 'variable' | 'warn' | 'error' | 'date';

export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'none';
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
  setting?: Model;
  shortUrl?: Model;
  user?: Model;
};

export type CreateShortUrlRequest = {
  name?: string;
  url: string;
  expiry?: Date | null;
  enabled: boolean;
  userId: number;
};

export type CreateShortUrlResponse = {
  status: Status;
  shortUrl?: {
    slug: string;
    url: string;
    expiry?: Date | null;
    enabled: boolean;
    userId: number;
  };
  originalUrl: string;
};

export type UpdateShortUrlRequest = {
  url: string;
  expiry?: Date | null;
  enabled: boolean;
};

export type UpdateShortUrlResponse = {
  status: Status;
  shortUrl?: {
    slug: string;
    url: string;
    expiry?: Date | null;
    enabled: boolean;
    userId: number;
  };
  originalUrl: string;
};

export type ShortUrlModel = {
  slug: string;
  originalUrl: string;
  userId: number;
  visits: number;
  expiry: Date | null;
  enabled: boolean;

  createdAt?: Date;
  updatedAt?: Date;
};

export type UserModel = {
  id?: number;
  username: string;
  password: string;
  apiKey?: string;
  enabled?: boolean;
  admin?: boolean;

  createdAt?: Date;
  updatedAt?: Date;

  shortUrls?: ShortUrlModel[];
};

export type SettingModel = {
  name: string;
  value: string | number | boolean | any;

  createdAt?: Date | null;
  updatedAt?: Date | null;
};

export type Status = 'ok' | 'error';

export type ColorType = 'text' | 'variable' | 'warn' | 'error' | 'date';

export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'none';
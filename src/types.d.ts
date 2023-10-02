export type ShortUrl = {
  slug: string;
  originalUrl: string;
  userId: number;
  visits: number;
  expiry: Date | null;
  enabled: boolean;

  //user?: User | null;

  createdAt?: Date;
  updatedAt?: Date;
};

export type User = {
  id?: number;
  username: string;
  password: string;
  apiKey?: string;
  enabled?: boolean;
  admin?: boolean;

  createdAt?: Date;
  updatedAt?: Date;

  shortUrls?: ShortUrl[];
};

export type Setting = {
  name: string;
  value: string | number | boolean | any;

  createdAt?: Date | null;
  updatedAt?: Date | null;
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
  expiry: Date | null;
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

export type RouteParamInfo = {
  name: string;
  type: string;
  description: string;
};

export type RouteInfo = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  parameters?: Array<RouteParamInfo>;
  response?: string;
};

export type UrlStatsData = {
  total: number;
  active: number;
  expired: number;
  enabled: number;
  disabled: number;
};

export type UserStatsData = {
  total: number;
  admins: number;
  users: number;
  enabled: number;
  disabled: number;
};

export type ThemeColorMode = 'light' | 'dark' | 'system';
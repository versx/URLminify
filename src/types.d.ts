export type ShortUrl = {
  slug: string;
  originalUrl: string;
  userId: number;
  visits: number;
  expiry: Date | null;
  enabled: boolean;

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
  value: string;

  createdAt?: Date;
  updatedAt?: Date;
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
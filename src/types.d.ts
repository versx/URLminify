export type ShortUrl = {
  slug: string;
  originalUrl: string;
  userId: number;
  visits: number;
  expiry: Date | null;
  enabled: boolean;

  createdAt?: string;
  updatedAt?: string;
};

export type User = {
  id?: number;
  username: string;
  password: string;
  apiKey?: string;
  enabled?: boolean;
  admin?: boolean;

  createdAt?: string;
  updatedAt?: string;

  shortUrls?: ShortUrl[];
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
export type ShortUrl = {
  slug: string;
  originalUrl: string;
  userId: number;
  visits: number;

  createdAt?: string;
  deletedAt?: string;
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
  deletedAt?: string;
  updatedAt?: string;

  shortUrls?: ShortUrl[];
};

export type CreateShortUrlRequest = {
  name?: string;
  url: string;
  userId: number;
};

export type CreateShortUrlResponse = {
  status: Status;
  shortUrl?: {
    slug: string;
    url: string;
    userId: number;
  };
  originalUrl: string;
};

export type UpdateShortUrlRequest = {
  url: string;
};

export type UpdateShortUrlResponse = {
  status: Status;
  shortUrl?: {
    slug: string;
    url: string;
    userId: number;
  };
  originalUrl: string;
};
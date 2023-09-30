// API routes
export const BaseApiRoute = '/api/v1/';
export const AuthApiRoute = BaseApiRoute + 'auth';
export const ShortUrlsApiRoute = BaseApiRoute + 'shorturls';
export const UsersApiRoute = BaseApiRoute + 'users';

export const DefaultExpiresIn = 365 * 86400; // 1 year

// Database table options
export const SequelizeOptions = {
  createdAt: true,
  updatedAt: true,
  underscored: true,
  timestamps: true,
};

// Database column attributes
export const ShortUrlAttributes = [
  'slug',
  'originalUrl',
  'userId',
  'visits',
  'expiry',
  'enabled',
  'createdAt',
  'updatedAt',
];
export const UserAttributes = [
  'id',
  'username',
  'apiKey',
  'enabled',
  'admin',
  'createdAt',
  'updatedAt',
];

export const DefaultUserPasswordIterations = 8;
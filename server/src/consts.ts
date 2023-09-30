// API routes
export const BaseApiRoute = '/api/v1/';
export const AuthApiRoute = BaseApiRoute + 'auth';
export const SettingsApiRoute = BaseApiRoute + 'settings';
export const ShortUrlsApiRoute = BaseApiRoute + 'shorturls';
export const UsersApiRoute = BaseApiRoute + 'users';

export const DefaultExpiresIn = 365 * 86400; // 1 year

export const DefaultMaxSlugLimit = 1000;

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

export const SettingKeys = {
  MaxSlugLimit: 'max_slug_limit',
};
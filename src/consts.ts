export const Routes = {
  dashboard: '/',
  slugs: '/:slug',
  shortUrls: '/urls',
  settings: '/settings',
  login: '/login',
  register: '/register',
  admin: {
    dashboard: '/admin',
    shortUrls: '/admin/urls',
    users: '/admin/users',
    settings: '/admin/settings',
  },
};

export const SettingKeys = {
  MaxSlugLimit: 'max_slug_limit',
};
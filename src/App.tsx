import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from 'react-router-dom';

import {
  AdminProtectedRoute,
  DrawerAppBar,
  ProtectedRoute,
  RedirectSlug,
} from './components';
import { Routes } from './consts';
import {
  AdminDashboardPage,
  AdminSettingsPage,
  AdminShortUrlsPage,
  AdminUsersPage,
  ApiDocumentationPage,
  DashboardPage,
  LoginPage,
  NotFoundPage,
  RegisterPage,
  SettingsPage,
  ShortUrlsPage,
} from './pages';

const App = () => {
  return (
    <Router>
      <DrawerAppBar>
      <Switch>
        <Route path="*" element={<NotFoundPage />} />
        <Route path={Routes.login} element={<LoginPage />} />
        <Route path={Routes.register} element={<RegisterPage />} />
        <Route path={Routes.dashboard} element={<ProtectedRoute />}>
          <Route index element={<DashboardPage />} />
          <Route path={Routes.shortUrls} element={<ShortUrlsPage />} />
          <Route path={Routes.settings} element={<SettingsPage />} />
          <Route path={Routes.admin.dashboard} element={<AdminProtectedRoute />}>
            <Route path={Routes.admin.dashboard} element={<AdminDashboardPage />}/>
            <Route path={Routes.admin.shortUrls} element={<AdminShortUrlsPage />}/>
            <Route path={Routes.admin.users} element={<AdminUsersPage />}/>
            <Route path={Routes.admin.settings} element={<AdminSettingsPage />}/>
          </Route>
        </Route>
        <Route path={Routes.apiDocs} element={<ApiDocumentationPage />} />
        <Route path={Routes.slugs} element={<RedirectSlug />} />
      </Switch>
      </DrawerAppBar>
    </Router>
  );
};

export default App;
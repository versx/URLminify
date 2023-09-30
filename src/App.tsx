import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from 'react-router-dom';

import { AdminProtectedRoute, DrawerAppBar, ProtectedRoute } from './components';
import { Routes } from './consts';
import {
  AdminDashboardPage,
  AdminShortUrlsPage,
  AdminUsersPage,
  DashboardPage,
  LoginPage,
  RegisterPage,
  SettingsPage,
  ShortUrlsPage,
} from './pages';

const App = () => {
  return (
    <Router>
      <DrawerAppBar>
      <Switch>
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
          </Route>
        </Route>
      </Switch>
      </DrawerAppBar>
    </Router>
  );
};

export default App;
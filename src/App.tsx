import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from 'react-router-dom';

import { DrawerAppBar, ProtectedRoute } from './components';
import { Routes } from './consts';
import {
  AccountPage,
  DashboardPage,
  LoginPage,
  RegisterPage,
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
          <Route path={Routes.settings} element={<AccountPage />} />
        </Route>
      </Switch>
      </DrawerAppBar>
    </Router>
  );
};

export default App;
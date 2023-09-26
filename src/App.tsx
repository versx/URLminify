import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from 'react-router-dom';

import { DrawerAppBar, ProtectedRoute } from './components';
import { AccountPage, HomePage, LoginPage, RegisterPage } from './pages';

const App = () => {
  return (
    <Router>
      <DrawerAppBar>
      <Switch>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<HomePage />} />
          <Route path="/account" element={<AccountPage />} />
        </Route>
      </Switch>
      </DrawerAppBar>
    </Router>
  );
};

export default App;
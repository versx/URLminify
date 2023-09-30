import { Outlet } from 'react-router-dom';

import { NotFoundPage } from '../pages';

export const AdminProtectedRoute = () => {
  const json = localStorage.getItem('user');
  const user = json ? JSON.parse(json) : null;
  if (!user?.admin) {
    // This will cause the router to navigate to the /login page
    // and skip rendering the children of this route.
    //return <LoginPage />;
    return <NotFoundPage />;
  }
  
  return <Outlet />;
};
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { ProtectedRouter, NotFound, Error } from '@wms/components';
import { DashBoardTemplateLazy, SignInTemplateLazy } from '@wms/templates';
import { dashboardRouter } from './dashboard.router';
import { settingsRouter } from './settings.router';
import { catalogueRouter } from './catalogue.router';
import { inventoryRouter } from './inventory.router';

const routeRoot = createBrowserRouter([
  {
    path: 'app/',
    element: <ProtectedRouter><DashBoardTemplateLazy /></ProtectedRouter>,
    errorElement: <Error />,
    children: [
      { index: true, element: <Navigate to={'dashboard'} replace />, errorElement: <Error /> },
      { ...dashboardRouter },
      { ...inventoryRouter },
      { ...catalogueRouter },
      { ...settingsRouter },
      { path: '*', element: <NotFound page />, errorElement: <Error /> },
    ],
  },
  {
    path: 'auth/',
    element: <ProtectedRouter isPublic><SignInTemplateLazy /></ProtectedRouter>,
    errorElement: <Error />,
    children: [
      // { index: true, element: <Outlet />, errorElement: <Error /> },
      { index: true, element: <Navigate to={'sign-in'} replace />, errorElement: <Error /> },
      { path: 'sign-in', element: <Outlet />, errorElement: <Error /> },
    ],
  },
  {
    path: '/',
    element: <Navigate to={'/app'} replace />,
    errorElement: <Error />,
  },
  {
    path: '*',
    element: <NotFound />,
    errorElement: <Error />,
  },
]);

export default routeRoot;
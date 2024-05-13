import { RouteObject, Navigate, Outlet } from 'react-router-dom';
import { Error, PanelRouter } from '@wms/components';
import {

} from '@wms/pages';

export const settingsRouter: RouteObject = {
  path: 'settings', element: <Outlet />, errorElement: <Error />,
  children: [
    {
      index: true,
      element: <PanelRouter />,
      errorElement: <Error />
    },
    {
      path: 'roles',
      element: <Outlet />,
      errorElement: <Error />
    },
    {
      path: 'users',
      element: <Outlet />,
      errorElement: <Error />
    },
    {
      path: 'profile',
      element: <Outlet />,
      errorElement: <Error />
    },
  ]
};
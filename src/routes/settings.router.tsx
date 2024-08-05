import { RouteObject, Navigate, Outlet } from 'react-router-dom';
import { Error, PanelRouter } from '@wms/components';
import {
  ProfilePageLazy,
  UsersPageLazy
} from '@wms/pages';

export const settingsRouter: RouteObject = {
  path: 'settings', element: <Outlet />, errorElement: <Error />,
  children: [
    {
      index: true,
      element: <PanelRouter />,
      errorElement: <Error />
    },
    // {
    //   path: 'roles',
    //   element: <Outlet />,
    //   errorElement: <Error />
    // },
    {
      path: 'users',
      element: <UsersPageLazy />,
      errorElement: <Error />
    },
    {
      path: 'profile',
      element: <ProfilePageLazy />,
      errorElement: <Error />
    },
  ]
};
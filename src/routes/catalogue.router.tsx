import { RouteObject, Outlet } from 'react-router-dom';
import { PanelRouter, Error } from '@wms/components';
import {

} from '@wms/pages';

export const catalogueRouter: RouteObject = {
  path: 'catalogue', element: <Outlet />, errorElement: <Error />,
  children: [
    {
      index: true,
      element: <PanelRouter />,
      errorElement: <Error />
    },
    {
      path: 'departaments',
      element: <Outlet />,
      errorElement: <Error />
    },
    {
      path: 'appointments',
      element: <Outlet />,
      errorElement: <Error />
    },
    {
      path: 'visit-types',
      element: <Outlet />,
      errorElement: <Error />
    },
    {
      path: 'visit-methods',
      element: <Outlet />,
      errorElement: <Error />
    },
    {
      path: 'type-personery',
      element: <Outlet />,
      errorElement: <Error />
    },
    {
      path: 'employees',
      element: <Outlet />,
      errorElement: <Error />
    },
  ]
};
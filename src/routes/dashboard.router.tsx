import { RouteObject, Outlet } from 'react-router-dom';
import { Error } from '@wms/components';
import {
  DashBoardPageLazy,
  MetricsPageLazy
} from '@wms/pages';

export const dashboardRouter: RouteObject = {
  path: 'dashboard', element: <Outlet />, errorElement: <Error />,
  children: [
    {
      index: true,
      element: <DashBoardPageLazy />,
      errorElement: <Error />
    },
    {
      path: 'metrics',
      element: <MetricsPageLazy
      />,
      errorElement: <Error />
    },
  ]
};
import { RouteObject, Outlet } from 'react-router-dom';
import { PanelRouter, Error } from '@wms/components';
import {
  UnitMeasurePageLazy,
  BrandPageLazy,
  ModelPageLazy
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
      path: 'unit-measure',
      element: <UnitMeasurePageLazy />,
      errorElement: <Error />
    },
    {
      path: 'brand',
      element: <BrandPageLazy />,
      errorElement: <Error />
    },
    {
      path: 'model',
      element: <ModelPageLazy />,
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
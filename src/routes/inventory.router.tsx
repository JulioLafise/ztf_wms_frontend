import { RouteObject, Outlet } from 'react-router-dom';
import { PanelRouter, Error } from '@wms/components';
import {
  DeparturesStepperLazy
} from '@wms/pages';

export const inventoryRouter: RouteObject = {
  path: 'inventory', element: <Outlet />, errorElement: <Error />,
  children: [
    {
      index: true,
      element: <PanelRouter />,
      errorElement: <Error />
    },
    {
      path: 'kardex',
      element: <Outlet />,
      errorElement: <Error />
    },
    {
      path: 'entries',
      element: <Outlet />,
      errorElement: <Error />
    },
    {
      path: 'departures',
      element: <DeparturesStepperLazy />,
      errorElement: <Error />
    },
    {
      path: 'products',
      element: <Outlet />,
      errorElement: <Error />
    },
    {
      path: 'purchase-order',
      element: <Outlet />,
      errorElement: <Error />
    },
  ]
};
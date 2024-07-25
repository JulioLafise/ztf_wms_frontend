import { RouteObject, Outlet } from 'react-router-dom';
import { PanelRouter, Error } from '@wms/components';
import {
  KardexPageLazy,
  EntryPageLazy,
  EntriesStepperLazy,
  DeparturePageLazy,
  DeparturesStepperLazy,
  PurchaseOrderPageLazy,
  ProductPageLazy,
  AddProductPageLazy
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
      element: <KardexPageLazy />,
      errorElement: <Error />
    },
    {
      path: 'entries',
      element: <EntryPageLazy />,
      errorElement: <Error />
    },
    {
      path: 'entries/new',
      element: <EntriesStepperLazy />,
      errorElement: <Error />
    },
    {
      path: 'entries/:entryId/edit',
      element: <EntriesStepperLazy />,
      errorElement: <Error />
    },
    {
      path: 'departures',
      element: <DeparturePageLazy />,
      errorElement: <Error />
    },
    {
      path: 'departures/new',
      element: <DeparturesStepperLazy />,
      errorElement: <Error />
    },
    {
      path: 'departures/:departureId/edit',
      element: <DeparturesStepperLazy />,
      errorElement: <Error />
    },
    {
      path: 'products',
      element: <ProductPageLazy />,
      errorElement: <Error />
    },
    {
      path: 'products/new',
      element: <AddProductPageLazy />,
      errorElement: <Error />
    },
    {
      path: 'products/:productId/edit',
      element: <AddProductPageLazy />,
      errorElement: <Error />
    },
    {
      path: 'purchase-order',
      element: <PurchaseOrderPageLazy />,
      errorElement: <Error />
    },
  ]
};
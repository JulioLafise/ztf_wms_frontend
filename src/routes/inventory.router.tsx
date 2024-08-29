import { RouteObject, Outlet } from 'react-router-dom';
import { PanelRouter, Error } from '@wms/components';
import {
  KardexPageLazy,
  CustomerStockPageLazy,
  EntryPageLazy,
  EntriesStepperLazy,
  EntryReportLazy,
  DeparturePageLazy,
  DeparturesStepperLazy,
  PurchaseOrderPageLazy,
  ProductPageLazy,
  AddProductPageLazy,
  CustomerPageLazy
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
      path: 'stock',
      element: <KardexPageLazy />,
      errorElement: <Error />
    },
    {
      path: 'customer-stock',
      element: <CustomerStockPageLazy />,
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
      path: 'entries/:reportId/report',
      element: <EntryReportLazy />,
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
    {
      path: 'customers',
      element: <CustomerPageLazy />,
      errorElement: <Error />
    },
  ]
};
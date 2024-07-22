import { RouteObject, Outlet } from 'react-router-dom';
import { PanelRouter, Error } from '@wms/components';
import {
  UnitMeasurePageLazy,
  BrandPageLazy,
  ModelPageLazy,
  WarehousePageLazy,
  TypeCurrencyPageLazy,
  FeaturesPageLazy,
  KitPageLazy,
  AddKitPageLazy,
  CategoryPageLazy,
  CountryPageLazy,
  ColorPageLazy,
  EntryTypePageLazy
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
      path: 'warehouse',
      element: <WarehousePageLazy />,
      errorElement: <Error />
    },
    {
      path: 'type-currency',
      element: <TypeCurrencyPageLazy />,
      errorElement: <Error />
    },
    {
      path: 'product-features',
      element: <FeaturesPageLazy />,
      errorElement: <Error />
    },
    {
      path: 'product-kit',
      element: <KitPageLazy />,
      errorElement: <Error />
    },
    {
      path: 'product-kit/new',
      element: <AddKitPageLazy />,
      errorElement: <Error />
    },
    {
      path: 'product-kit/:kitId/edit',
      element: <AddKitPageLazy />,
      errorElement: <Error />
    },
    {
      path: 'product-category',
      element: <CategoryPageLazy />,
      errorElement: <Error />
    },
    {
      path: 'countries',
      element: <CountryPageLazy />,
      errorElement: <Error />
    },
    {
      path: 'colors',
      element: <ColorPageLazy />,
      errorElement: <Error />
    },
    {
      path: 'entry-type',
      element: <EntryTypePageLazy />,
      errorElement: <Error />
    },
  ]
};
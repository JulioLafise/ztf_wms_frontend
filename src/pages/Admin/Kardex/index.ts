import React from 'react';

export const KardexPageLazy = React.lazy(() => import(/* webpackChunkName: "Kardex" */ './Kardex'));
export const CustomerStockPageLazy = React.lazy(() => import(/* webpackChunkName: "CustomerStock" */ './CustomerStock'));
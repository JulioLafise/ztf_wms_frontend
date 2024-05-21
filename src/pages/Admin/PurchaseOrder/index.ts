import React from 'react';

export const PurchaseOrderPageLazy = React.lazy(() => import(/* webpackChunkName: "PurchaseOrder" */ './PurchaseOrder'));
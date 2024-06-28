import React from 'react';

export const ProductPageLazy = React.lazy(() => import(/* webpackChunkName: "Product" */ './Product'));
export const AddProductPageLazy = React.lazy(() => import(/* webpackChunkName: "AddProduct" */ './AddProduct'));
import React from 'react';

export const ProductStatusPageLazy = React.lazy(() => import(/* webpackChunkName: "ProductStatus" */ './ProductStatus'));
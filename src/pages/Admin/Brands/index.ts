import React from 'react';

export const BrandPageLazy = React.lazy(() => import(/* webpackChunkName: "Brand" */ './Brand'));
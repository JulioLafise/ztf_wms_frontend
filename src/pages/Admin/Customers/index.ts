import React from 'react';

export const CustomerPageLazy = React.lazy(() => import(/* webpackChunkName: "Customer" */ './Customer'));
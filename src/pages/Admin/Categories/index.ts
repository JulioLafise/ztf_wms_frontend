import React from 'react';

export const CategoryPageLazy = React.lazy(() => import(/* webpackChunkName: "Category" */ './Category'));
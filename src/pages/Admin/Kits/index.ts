import React from 'react';

export const KitPageLazy = React.lazy(() => import(/* webpackChunkName: "Kit" */ './Kit'));
export const AddKitPageLazy = React.lazy(() => import(/* webpackChunkName: "AddKit" */ './AddKit'));
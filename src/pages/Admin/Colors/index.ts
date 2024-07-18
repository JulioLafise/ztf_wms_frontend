import React from 'react';

export const ColorPageLazy = React.lazy(() => import(/* webpackChunkName: "Color" */ './Color'));
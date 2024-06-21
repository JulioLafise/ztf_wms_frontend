import React from 'react';

export const FeaturesPageLazy = React.lazy(() => import(/* webpackChunkName: "Features" */ './Features'));
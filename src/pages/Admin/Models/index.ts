import React from 'react';

export const ModelPageLazy = React.lazy(() => import(/* webpackChunkName: "Model" */ './Model'));
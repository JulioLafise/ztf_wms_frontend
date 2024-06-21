import React from 'react';

export const CountryPageLazy = React.lazy(() => import(/* webpackChunkName: "Country" */ './Country'));
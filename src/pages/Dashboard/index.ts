import React from 'react';

export const DashBoardPageLazy = React.lazy(() => import(/* webpackChunkName: "DashBoard" */ './DashBoard'));
export const MetricsPageLazy = React.lazy(() => import(/* webpackChunkName: "Metrics" */ './Metrics'));
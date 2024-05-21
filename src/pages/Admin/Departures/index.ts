import React from 'react';

export const DeparturesStepperLazy = React.lazy(() => import(/* webpackChunkName: "DeparturesStepper" */ './DeparturesStepper'));
export const DeparturePageLazy = React.lazy(() => import(/* webpackChunkName: "Departure" */ './Departure'));
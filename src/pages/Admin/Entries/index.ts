import React from 'react';

export const EntriesStepperLazy = React.lazy(() => import(/* webpackChunkName: "EntriesStepper" */ './EntriesStepper'));
export const EntryPageLazy = React.lazy(() => import(/* webpackChunkName: "Entry" */ './Entry'));
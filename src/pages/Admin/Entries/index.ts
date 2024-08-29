import React from 'react';

export const EntriesStepperLazy = React.lazy(() => import(/* webpackChunkName: "EntriesStepper" */ './EntriesStepper'));
export const EntryPageLazy = React.lazy(() => import(/* webpackChunkName: "Entry" */ './Entry'));
export const EntryReportLazy = React.lazy(() => import(/* webpackChunkName: "EntryReport" */ './Steps/Report'));
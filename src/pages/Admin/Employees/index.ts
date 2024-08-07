import React from 'react';

export const EmployeePageLazy = React.lazy(() => import(/* webpackChunkName: "Employee" */ './Employee'));
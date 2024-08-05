import React from 'react';

export const UsersPageLazy = React.lazy(() => import(/* webpackChunkName: "Users" */ './Users'));
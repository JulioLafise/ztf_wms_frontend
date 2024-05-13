import React from 'react';

export const DashBoardTemplateLazy = React.lazy(() => import(/* webpackChunkName: "DashBoardTemplate" */'./DashBoard.template'));
export const SignInTemplateLazy = React.lazy(() => import(/* webpackChunkName: "SignInTemplate" */'./SignIn.template'));
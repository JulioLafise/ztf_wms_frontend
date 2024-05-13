import React from 'react';

export const SignInPageLazy = React.lazy(() => import(/* webpackChunkName: "SignIn" */ './SignIn'));
export const ProfilePageLazy = React.lazy(() => import(/* webpackChunkName: "Profile" */ './Profile'));
export const ChangePasswordPageLazy = React.lazy(() => import(/* webpackChunkName: "ChangePassword" */ './ChangePassword'));
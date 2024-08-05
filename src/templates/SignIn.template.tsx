import React from 'react';
import SideForm from './layouts/SideForm';
import { SignInPageLazy } from '@wms/pages';
import {
  useAuth,
  useToastNotification,
  useUI,
} from '@wms/hooks';
import { Validator } from '@wms/helpers';

const SignInTemplate = () => {
  const isMounted = React.useRef(false);
  const { onDarkMode, changePaletteColors } = useUI();
  const {
    user,
    token,
    isAuthenticated,
    isChecking,
    onSignIn,
    onRefreshToken,
    onSignOut,
  } = useAuth();
  const { toastSuccess, toastError } = useToastNotification();

  const onSubmit = (_values: { [key: string]: any }) => {
    if (!isAuthenticated) {
      onSignIn(_values)
        .then(resp => {        
          toastSuccess(`Welcome, ${_values.username.split('@')[0]}`, { duration: 2500 });
        })
        .catch(err => {
          toastError(err.message);
          // if (String(err.message).indexOf('Credential') > -1) {

          // }
        });
    }
  };

  React.useEffect(() => {
    if (!user) {
      if (!isMounted.current && token) onRefreshToken()
        .then((resp) => {
          // toastSuccess(`Welcome`, { duration: 2500 });
          return;
        })
        .catch(err => {
          toastError(err.message);
          onSignOut();
        });
    }
  }, []);

  React.useEffect(() => {!isAuthenticated && onDarkMode(false, true);}, [isAuthenticated]);

  return (
    <SideForm>
      <SignInPageLazy onSubmit={onSubmit} isLoading={isChecking} />
    </SideForm>
  );
};

export default SignInTemplate;
import React from 'react';
import SideForm from './layouts/SideForm';
import { SignInPageLazy, ChangePasswordPageLazy } from '@wms/pages';
import {
  useAuth,
  useToastNotification,
  useUI,
  useUser
} from '@wms/hooks';

const SignInTemplate = () => {
  const isMounted = React.useRef(false);
  const { onDarkMode, changePaletteColors } = useUI();
  const {
    user,
    token,
    isAuthenticated,
    isChecking,
    isChangePassword,
    onSignIn,
    onRefreshToken,
    onSignOut,
    onRefreshUser
  } = useAuth();
  const { toastSuccess, toastError } = useToastNotification();
  const { useChangePasswordUserMutation } = useUser();
  const mutationPassword = useChangePasswordUserMutation(undefined, { password: 'update' });
  const [password, setPassword] = React.useState<string>('');
  const [isLoadingPassword, setIsLoadingPassword] = React.useState<boolean>(false);

  const onSubmit = (_values: { [key: string]: any }) => {
    if (!isAuthenticated) {
      setPassword(_values.password);
      onSignIn(_values)
        .then(resp => {        
          if (!resp.isChangePassword) {
            toastSuccess(`Welcome, ${resp.username}`, { duration: 2500 });
          }
        })
        .catch(err => {
          toastError(err.message);
        });
    }
    if (isChangePassword) {
      const data: any = {
        oldPassword: _values.password,
        password: _values.newPassword,
        userId: user?.userId
      };
      setIsLoadingPassword(true);
      mutationPassword.mutateAsync(data)
        .then(resp => {
          onRefreshUser().then(() => {
            setIsLoadingPassword(false);
            toastSuccess(`Welcome, ${resp.username}`, { duration: 2500 });
          });
        })
        .catch((err) => {
          toastError(err.message);
          setIsLoadingPassword(false);
        });
    }
  };

  // React.useEffect(() => {    
  //   if (!user) {
  //     if (!isMounted.current && token) onRefreshToken()
  //       .then(resp => {
  //         if (!resp.isChangePassword) {
  //           toastSuccess(`Welcome, ${resp.username}`, { duration: 2500 });
  //         }
  //         return;
  //       })
  //       .catch(err => {
  //         toastError(err.message);
  //         onSignOut();
  //       });
  //   }
  // }, []);

  React.useEffect(() => {!isAuthenticated && onDarkMode(false, true);}, [isAuthenticated]);

  return (
    <SideForm>
      {
        isAuthenticated
          ? (
            isChangePassword && (
              <ChangePasswordPageLazy onSubmit={onSubmit} isLoading={mutationPassword.isPending || isLoadingPassword} password={password} />
            )
          )
          : (<SignInPageLazy onSubmit={onSubmit} isLoading={isChecking} />)
      }
    </SideForm>
  );
};

export default SignInTemplate;
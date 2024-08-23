import React from 'react';
import { useAppSelector, useAppDispatch } from '@wms/redux/selector';
import { authAsyncThunks } from '@wms/redux/actions';
import { LocalStorageConfig } from '@wms/config';
import { Validator } from '@wms/helpers';
import { SignInDTO } from '@wms/dtos';

const useAuth = () => {
  const token = LocalStorageConfig.getItem<string>('token', 'string');
  const dispatch = useAppDispatch();

  const { isAuthenticated, user, isChecking } = useAppSelector(state => state.authReducer);
  const [isLoading, setLoading] = React.useState<boolean>(false);

  const onSignIn = async (data: { [key: string]: any }) => {
    try {
      const [errors, signInDto] = await SignInDTO.create({ ...data, isEcommerce: false });
      if (errors) throw new Error(errors);
      const result = (await dispatch(authAsyncThunks.getSignIn(signInDto!))).payload;
      Validator.httpValidation(result as any);
      return Promise.resolve(result);
    } catch (error) {      
      return Promise.reject(error);
    }
  };

  const onSignOut = async () => {
    try {
      const result = (await dispatch(authAsyncThunks.getSignOut(undefined))).payload;
      return Promise.resolve(null);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const onRefreshToken = async () => {
    try {
      const result = (await dispatch(authAsyncThunks.getRefreshToken(undefined))).payload;
      Validator.httpValidation(result as any);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const onChangePassword = async (data: { oldPassword: string, newPassword: string }) => {
    try {
      setLoading(true);
      const result = (await dispatch(authAsyncThunks.putChangePassword(data))).payload;
      Validator.httpValidation(result as any);
      setLoading(false);
      return Promise.resolve(result);
    } catch (error) {
      setLoading(false);
      return Promise.reject(error);
    }
  };

  const onForgotPassword = async (data: { username: string }) => {
    try {
      setLoading(true);
      const result = (await dispatch(authAsyncThunks.putForgotPassword(data))).payload;
      Validator.httpValidation(result as any);
      setLoading(false);
      return Promise.resolve(result);
    } catch (error) {
      setLoading(false);
      return Promise.reject(error);
    }
  };

  return {
    //VAR
    isAuthenticated,
    isChecking,
    isLoading,
    user,
    token,
    //METHODS
    onSignIn,
    onSignOut,
    onRefreshToken,
    onChangePassword,
    onForgotPassword
  };
};

export default useAuth;
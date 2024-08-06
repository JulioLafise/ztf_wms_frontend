import { createAsyncThunk } from '@reduxjs/toolkit';
import { filterErrorAxios, parseJwt } from '@wms/helpers';
import { WMSAPI } from '@wms/apis';
import { IPayloadJWT } from '@wms/interfaces';
import { LocalStorageConfig } from '@wms/config';
import { SignInDTO } from '@wms/dtos';
import { onChecking } from '../../reducer/slices/auth.slice';


export const getSignIn = createAsyncThunk(
  'Auth/getSignIn',
  async (signIn: SignInDTO, { rejectWithValue, dispatch }) => {
    try {
      dispatch(onChecking(true));
      const { data } = await WMSAPI.signInPOST({ body: signIn });
      const payload = parseJwt<IPayloadJWT>(data.resultAuth.idToken);
      LocalStorageConfig.setItem('token', data.resultAuth.idToken);
      LocalStorageConfig.setItem('sid', payload.sub || '');
      LocalStorageConfig.setItem('acstk', data.resultAuth.accessToken);
      LocalStorageConfig.setItem('rftk', data.resultAuth.refreshToken);
      LocalStorageConfig.setItem('expire', String(data.resultAuth.expiresIn));
      return {
        userId: payload.sub,
        username: payload['cognito:username'],
        email: payload.email,
        address: payload.address.formatted,
        picture: payload.picture,
        identificationCard: payload.given_name,
        firstName: payload.name,
        lastName: payload.middle_name,
        phone: payload.phone_number,
        rolGroup: payload.website,
        isVerified: payload.email_verified
      };
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const getSignOut = createAsyncThunk(
  'Auth/getSignOut',
  async (args: any, { rejectWithValue, dispatch }) => {
    try {
      LocalStorageConfig.removeItems(['expire', 'token', 'sid', 'rftk', 'nav-path', 'acstk']);
      return null;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);


export const getRefreshToken = createAsyncThunk(
  'Auth/getRefreshToken',
  async (args: any, { rejectWithValue, dispatch }) => {
    try {
      dispatch(onChecking(true));
      const refreshToken = localStorage.getItem('rftk') || '';
      const { data } = await WMSAPI.refreshTokenPOST({ body: { refreshToken, isEcommerce: false } });
      const payload = parseJwt<IPayloadJWT>(data.authenticationResult.idToken);
      LocalStorageConfig.setItem('token', data.authenticationResult.idToken);
      LocalStorageConfig.setItem('sid', payload.sub || '');
      LocalStorageConfig.setItem('acstk', data.authenticationResult.accessToken);
      LocalStorageConfig.setItem('expire', String(data.authenticationResult.expiresIn));
      return {
        userId: payload.sub,
        username: payload['cognito:username'],
        email: payload.email,
        address: payload.address.formatted,
        picture: payload.picture,
        identificationCard: payload.given_name,
        firstName: payload.name,
        lastName: payload.middle_name,
        phone: payload.phone_number,
        rolGroup: payload.website,
        isVerified: payload.email_verified
      };
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);


export const putChangePassword = createAsyncThunk(
  'Auth/putChangePassword',
  async (args: { oldPassword: string, newPassword: string }, { rejectWithValue, dispatch }) => {
    try {
      const accessToken = LocalStorageConfig.getItem<string>('acstk', 'string', '');
      const { data } = await WMSAPI.updateUserChangePasswordPUT({ body: { accessToken, ...args } });
      if (data.status !== 200) return false;
      return true;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);
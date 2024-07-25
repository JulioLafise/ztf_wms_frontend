import { createAsyncThunk } from '@reduxjs/toolkit';
import { filterErrorAxios } from '@wms/helpers';
import { WMSAPI } from '@wms/apis';
import { LocalStorageConfig, AWSTools, enviroment } from '@wms/config';
import { SignInDTO } from '@wms/dtos';
import { onChecking } from '../../reducer/slices/auth.slice';


export const getSignIn = createAsyncThunk(
  'Auth/getSignIn',
  async (signIn: SignInDTO, { rejectWithValue, dispatch }) => {
    try {
      dispatch(onChecking(true));
      const { data } = await WMSAPI.signInPOST({ body: signIn });
      LocalStorageConfig.setItem('token', data.resultAuth.idToken);
      LocalStorageConfig.setItem('sid', signIn.userName || '');
      LocalStorageConfig.setItem('acstk', data.resultAuth.accessToken);
      LocalStorageConfig.setItem('rftk', data.resultAuth.refreshToken);
      LocalStorageConfig.setItem('expire', String(data.resultAuth.expiresIn));
      // if (!!data.resultAuth.user.userImage && data.resultAuth.user.userImage != '') {
      //   const imageUrl = await getImageUrl(data.resultAuth.user.userImage);
      //   return { ...data.resultAuth.user, userImage: imageUrl };
      // }
      return { username: signIn.userName, email: signIn.userName };
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
      const { data } = await WMSAPI.refreshTokenPOST({ body: { refreshToken } });
      LocalStorageConfig.setItem('token', data.detail.idToken);
      LocalStorageConfig.setItem('sid', data.detail.user.username || '');
      LocalStorageConfig.setItem('acstk', data.detail.accessToken);
      LocalStorageConfig.setItem('expire', data.detail.expiresIn.toString());
      if (!!data.detail.user.userImage && data.detail.user.userImage != '') {
        const imageUrl = await getImageUrl(data.detail.user.userImage);
        return { ...data.detail.user, userImage: imageUrl };
      }
      return data.detail.user;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

export const getRefreshUser = createAsyncThunk(
  'Auth/getRefreshUser',
  async (args: any, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await WMSAPI.refreshUserGET();
      if (data.detail.user.userImage && data.detail.user.userImage != '') {
        const imageUrl = await getImageUrl(data.detail.user.userImage);
        return { ...data.detail.user, userImage: imageUrl };
      }
      return data.detail.user;
    } catch (rejectedValueOrSerializedError) {
      return rejectWithValue(filterErrorAxios(rejectedValueOrSerializedError));
    }
  }
);

const getImageUrl = async (fileName?: string) => {
  const s3 = new AWSTools({
    accessKeyId: enviroment.accessKeyId,
    secretAccessKey: enviroment.secretAccessKey,
    region: enviroment.region,
    bucket: 'imagen'
  });
  return await s3.getObjectUrl({
    fileName: String(fileName),
    folderName: 'alm-mis',
  });
};
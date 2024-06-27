import { httpClient } from '../http-config';
import { IJsonBody, IJsonResponse, IBodyProps } from '@wms/interfaces';


interface ISignInResp {
  user: any,
  expiresIn: number,
  idToken: string,
  refreshToken: string
  accessToken: string
}

export const signInPOST = async (options: IBodyProps<any>): Promise<IJsonBody<IJsonResponse<ISignInResp>>> => await httpClient.post({
  url: 'security/auth/sign-in/',
  options: {
    data: options.body
  }
});

export const refreshTokenPOST = async (options: IBodyProps<{ refreshToken: string }>): Promise<IJsonBody<IJsonResponse<ISignInResp>>> => await httpClient.post({
  url: 'security/auth/refresh-token-user/',
  options: {
    data: options.body,
  }
});

export const refreshUserGET = async (): Promise<IJsonBody<IJsonResponse<ISignInResp>>> => await httpClient.get({
  url: 'security/auth/refresh_user/',
  options: {}
});
import { httpClient } from '../http-config';
import { IJsonBody, IJsonResponse, IBodyProps } from '@wms/interfaces';
import { SignInDTO, ConfirmDTO } from '@wms/dtos';
import { SingInEntity } from '@wms/entities';

interface ISignInResp {
  user: any,
  expiresIn: number,
  idToken: string,
  refreshToken: string
  accessToken: string
}

export const signInPOST = async (options: IBodyProps<SignInDTO>): Promise<IJsonBody<{ resultAuth: SingInEntity }>> => await httpClient.post({
  url: 'authcognitopubcontrollers/signin/',
  options: {
    data: options.body
  }
});

export const confirmPUT = async (options: IBodyProps<ConfirmDTO>): Promise<IJsonBody<IJsonResponse<any>>> => await httpClient.put({
  url: 'authcognitopubcontrollers/confirmet/',
  options: {
    data: options.body
  }
});

export const refreshTokenPOST = async (options: IBodyProps<{ refreshToken: string, isEcommerce: boolean }>): Promise<IJsonBody<{ authenticationResult: SingInEntity }>> => await httpClient.post({
  url: 'authcognitopubcontrollers/refresh-token/',
  options: {
    data: options.body,
  }
});

export const refreshUserGET = async (): Promise<IJsonBody<IJsonResponse<ISignInResp>>> => await httpClient.get({
  url: 'security/auth/refresh_user/',
  options: {}
});
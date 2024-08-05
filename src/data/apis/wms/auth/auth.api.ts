import { httpClient } from '../http-config';
import { IJsonBody, IJsonResponse, IBodyProps } from '@wms/interfaces';
import { SignInDTO, ConfirmDTO, UsersDTO } from '@wms/dtos';
import { SingInEntity } from '@wms/entities';

interface UpdatePassword {
  accessToken: string,
  oldPassword: string,
  newPassword: string
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

export const updateUserChangePasswordPUT = async (options: IBodyProps<UpdatePassword>): Promise<IJsonBody<{ data: string, status: number }>> => await httpClient.put({
  url: 'cognitocontrollers/change-password',
  options: {
    data: options.body
  }
});

export const updateUserForgotPasswordPUT = async (options: IBodyProps<UsersDTO>): Promise<IJsonBody<string>> => await httpClient.put({
  url: 'authcognitopubcontrollers/forgot-password',
  options: {
    data: options.body
  }
});
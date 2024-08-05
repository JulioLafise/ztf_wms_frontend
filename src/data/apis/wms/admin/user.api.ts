import { httpClient } from '../http-config';
import { PaginationDTO, UsersDTO } from '@wms/dtos';
import {
  IJsonBody,
  IPaginationResp,
  IPaginationProps,
  IBodyProps,
  IParamsProps
} from '@wms/interfaces';
import { UserEntity } from '@wms/entities';



export const usersListGET = async (options: IParamsProps<{ isEcommerce: boolean }>): Promise<IJsonBody<UserEntity[]>> => await httpClient.get({
  url: 'cognitocontrollers/list-user',
  options: {
    params: options.params
  }
});

export const userGET = async (options: IParamsProps<UsersDTO>): Promise<IJsonBody<UserEntity>> => await httpClient.get({
  url: `cognitocontrollers/get-user/${options.params.sub}/`,
  options: {}
});

export const createUserPOST = async (options: IBodyProps<UsersDTO>): Promise<IJsonBody<UserEntity>> => await httpClient.post({
  url: 'authcognitopubcontrollers/register',
  options: {
    data: options.body
  }
});

export const updateUserPUT = async (options: IBodyProps<UsersDTO>): Promise<IJsonBody<UserEntity>> => await httpClient.put({
  url: 'cognitocontrollers/attributes',
  options: {
    data: options.body
  }
});

export const updateUserPhonePUT = async (options: IBodyProps<UsersDTO>): Promise<IJsonBody<UserEntity>> => await httpClient.put({
  url: 'cognitocontrollers/attributes-phone',
  options: {
    data: options.body
  }
});

import { httpClient } from '../http-config';
import { PaginationDTO, CustomerDTO } from '@wms/dtos';
import {
  IJsonBody,
  IPaginationResp,
  IPaginationProps,
  IBodyProps
} from '@wms/interfaces';
import { CustomerEntity } from '@wms/entities';


export const customerListGET = async (options: IPaginationProps<PaginationDTO>): Promise<IJsonBody<IPaginationResp<CustomerEntity>>> => await httpClient.get({
  url: 'cliente',
  options: {
    params: options.params
  }
});

export const createCustomerPOST = async (options: IBodyProps<CustomerDTO>): Promise<IJsonBody<CustomerEntity | string>> => await httpClient.post({
  url: 'cliente',
  options: {
    data: options.body
  }
});

export const updateCustomerPUT = async (options: IBodyProps<CustomerDTO>): Promise<IJsonBody<CustomerEntity | string>> => await httpClient.put({
  url: `cliente/${options.body.clienteId}/`,
  options: {
    data: options.body
  }
});

export const eliminateCustomerDELETE = async (options: IBodyProps<CustomerDTO>): Promise<IJsonBody<CustomerEntity | string>> => await httpClient.delete({
  url: `cliente/${options.body.clienteId}/`,
  options: {
    data: options.body
  }
});
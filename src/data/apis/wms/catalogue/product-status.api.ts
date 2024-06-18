import { httpClient } from '../http-config';
import { PaginationDTO, ProductStatusDTO } from '@wms/dtos';
import {
  IJsonBody,
  IPaginationResp,
  IPaginationProps,
  IBodyProps
} from '@wms/interfaces';
import { ProductStatusEntity } from '@wms/entities';


export const productStatusListGET = async (options: IPaginationProps<PaginationDTO>): Promise<IJsonBody<IPaginationResp<ProductStatusEntity>>> => await httpClient.get({
  url: 'estadoproducto',
  options: {
    params: options.params
  }
});

export const createProductStatusPOST = async (options: IBodyProps<ProductStatusDTO>): Promise<IJsonBody<ProductStatusEntity | string>> => await httpClient.post({
  url: 'estadoproducto',
  options: {
    data: options.body
  }
});

export const updateProductStatusPUT = async (options: IBodyProps<ProductStatusDTO>): Promise<IJsonBody<ProductStatusEntity | string>> => await httpClient.put({
  url: `estadoproducto/${options.body.estadoProductoId}/`,
  options: {
    data: options.body
  }
});

export const eliminateProductStatusDELETE = async (options: IBodyProps<ProductStatusDTO>): Promise<IJsonBody<ProductStatusEntity | string>> => await httpClient.delete({
  url: `estadoproducto/${options.body.estadoProductoId}/`,
  options: {
    data: options.body
  }
});
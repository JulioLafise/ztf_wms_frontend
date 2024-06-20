import { httpClient } from '../http-config';
import { PaginationDTO, TypeCurrencyDTO } from '@wms/dtos';
import {
  IJsonBody,
  IPaginationResp,
  IPaginationProps,
  IBodyProps
} from '@wms/interfaces';
import { TypeCurrencyEntity } from '@wms/entities';


export const typeCurrencyListGET = async (options: IPaginationProps<PaginationDTO>): Promise<IJsonBody<IPaginationResp<TypeCurrencyEntity>>> => await httpClient.get({
  url: 'tipomoneda',
  options: {
    params: options.params
  }
});

export const createTypeCurrencyPOST = async (options: IBodyProps<TypeCurrencyDTO>): Promise<IJsonBody<TypeCurrencyEntity | string>> => await httpClient.post({
  url: 'tipomoneda',
  options: {
    data: options.body
  }
});

export const updateTypeCurrencyPUT = async (options: IBodyProps<TypeCurrencyDTO>): Promise<IJsonBody<TypeCurrencyEntity | string>> => await httpClient.put({
  url: `tipomoneda/${options.body.tipoMonedaId}/`,
  options: {
    data: options.body
  }
});

export const eliminateTypeCurrencyDELETE = async (options: IBodyProps<TypeCurrencyDTO>): Promise<IJsonBody<TypeCurrencyEntity | string>> => await httpClient.delete({
  url: `tipomoneda/${options.body.tipoMonedaId}/`,
  options: {
    data: options.body
  }
});
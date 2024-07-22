import { httpClient } from '../http-config';
import { PaginationDTO, KitDTO } from '@wms/dtos';
import {
  IJsonBody,
  IPaginationResp,
  IPaginationProps,
  IBodyProps,
  IParamsProps
} from '@wms/interfaces';
import { KitEntity } from '@wms/entities';


export const kitListGET = async (options: IPaginationProps<PaginationDTO>): Promise<IJsonBody<IPaginationResp<KitEntity>>> => await httpClient.get({
  url: 'catalogokit',
  options: {
    params: options.params
  }
});


export const kitGET = async (options: IParamsProps<KitDTO>): Promise<IJsonBody<KitEntity>> => await httpClient.get({
  url: `catalogokit/${options.params.catalogokitId}/`,
  options: {
    data: options.params
  }
});

export const createKitPOST = async (options: IBodyProps<KitDTO>): Promise<IJsonBody<KitEntity | string>> => await httpClient.post({
  url: 'catalogokit',
  options: {
    data: options.body
  }
});

export const updateKitPUT = async (options: IBodyProps<KitDTO>): Promise<IJsonBody<KitEntity | string>> => await httpClient.put({
  url: `catalogokit/${options.body.catalogokitId}/`,
  options: {
    data: options.body
  }
});

export const eliminateKitDELETE = async (options: IParamsProps<KitDTO>): Promise<IJsonBody<KitEntity | string>> => await httpClient.delete({
  url: `catalogokit/${options.params.catalogokitId}/`,
  options: {
    data: options.body
  }
});
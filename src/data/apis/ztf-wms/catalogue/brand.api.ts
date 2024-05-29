import { httpClient } from '../http-config';
import { PaginationDTO, BrandDTO } from '@wms/dtos';
import {
  IJsonBody,
  IPaginationResp,
  IPaginationProps,
  IBodyProps
} from '@wms/interfaces';
import { BrandEntity } from '@wms/entities';


export const brandListGET = async (options: IPaginationProps<PaginationDTO>): Promise<IJsonBody<IPaginationResp<BrandEntity>>> => await httpClient.get({
  url: 'marca',
  options: {
    params: options.params
  }
});

export const createBrandPOST = async (options: IBodyProps<BrandDTO>): Promise<IJsonBody<BrandEntity | string>> => await httpClient.post({
  url: 'marca',
  options: {
    data: options.body
  }
});

export const updateBrandPUT = async (options: IBodyProps<BrandDTO>): Promise<IJsonBody<BrandEntity | string>> => await httpClient.put({
  url: `marca/${options.body.marcaId}/`,
  options: {
    data: options.body
  }
});

export const eliminateBrandDELETE = async (options: IBodyProps<BrandDTO>): Promise<IJsonBody<BrandEntity | string>> => await httpClient.delete({
  url: `marca/${options.body.marcaId}/`,
  options: {
    data: options.body
  }
});
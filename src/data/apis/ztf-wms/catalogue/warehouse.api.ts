import { httpClient } from '../http-config';
import { PaginationDTO, WarehouseDTO } from '@wms/dtos';
import {
  IJsonBody,
  IPaginationResp,
  IPaginationProps,
  IBodyProps
} from '@wms/interfaces';
import { WarehouseEntity } from '@wms/entities';


export const warehouseListGET = async (options: IPaginationProps<PaginationDTO>): Promise<IJsonBody<IPaginationResp<WarehouseEntity>>> => await httpClient.get({
  url: 'bodega',
  options: {
    params: options.params
  }
});

export const createWarehousePOST = async (options: IBodyProps<WarehouseDTO>): Promise<IJsonBody<WarehouseEntity | string>> => await httpClient.post({
  url: 'bodega',
  options: {
    data: options.body
  }
});

export const updateWarehousePUT = async (options: IBodyProps<WarehouseDTO>): Promise<IJsonBody<WarehouseEntity | string>> => await httpClient.put({
  url: `bodega/${options.body.bodegaId}/`,
  options: {
    data: options.body
  }
});

export const eliminateWarehouseDELETE = async (options: IBodyProps<WarehouseDTO>): Promise<IJsonBody<WarehouseEntity | string>> => await httpClient.delete({
  url: `bodega/${options.body.bodegaId}/`,
  options: {
    data: options.body
  }
});
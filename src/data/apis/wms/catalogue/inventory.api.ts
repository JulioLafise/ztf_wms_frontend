import { httpClient } from '../http-config';
import { PaginationDTO } from '@wms/dtos';
import {
  IJsonBody,
  IPaginationResp,
  IPaginationProps,
  IBodyProps
} from '@wms/interfaces';
import { InventoryEntity } from '@wms/entities';


export const inventoryListGET = async (options: IPaginationProps<PaginationDTO>): Promise<IJsonBody<IPaginationResp<InventoryEntity>>> => await httpClient.get({
  url: 'inventario/producto-basic-stock',
  options: {
    params: options.params
  }
});

export const availableStockListGET = async (options: IPaginationProps<PaginationDTO>): Promise<IJsonBody<IPaginationResp<InventoryEntity>>> => await httpClient.get({
  url: 'inventario/stock-disponible',
  options: {
    params: options.params
  }
});

export const customerStockListGET = async (options: IPaginationProps<PaginationDTO>): Promise<IJsonBody<IPaginationResp<InventoryEntity>>> => await httpClient.get({
  url: 'inventario/stock-cliente',
  options: {
    params: options.params
  }
});
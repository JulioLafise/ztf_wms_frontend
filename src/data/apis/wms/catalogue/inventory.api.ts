import { httpClient } from '../http-config';
import { PaginationDTO } from '@wms/dtos';
import {
  IJsonBody,
  IPaginationResp,
  IPaginationProps,
  IParamsProps
} from '@wms/interfaces';
import {
  InventoryEntity,
  AvailableStockEntity,
  CustomerStockEntity,
  InventoryDepartureEntity
} from '@wms/entities';


export const inventoryListGET = async (options: IPaginationProps<PaginationDTO>): Promise<IJsonBody<IPaginationResp<InventoryEntity>>> => await httpClient.get({
  url: 'inventario/producto-basic-stock',
  options: {
    params: options.params
  }
});

export const inventoryDepartureListGET = async (options: IParamsProps<never>): Promise<IJsonBody<InventoryDepartureEntity>> => await httpClient.get({
  url: 'inventario/producto-basic-stock-salida',
  options: {
    params: options.params
  }
});

export const availableStockListGET = async (options: IPaginationProps<PaginationDTO>): Promise<IJsonBody<IPaginationResp<AvailableStockEntity>>> => await httpClient.get({
  url: 'inventario/stock-disponible',
  options: {
    params: options.params
  }
});

export const customerStockListGET = async (options: IPaginationProps<PaginationDTO>): Promise<IJsonBody<IPaginationResp<CustomerStockEntity>>> => await httpClient.get({
  url: 'inventario/stock-cliente',
  options: {
    params: options.params
  }
});
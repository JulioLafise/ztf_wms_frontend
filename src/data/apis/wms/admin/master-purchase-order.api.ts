import { httpClient } from '../http-config';
import { PaginationDTO, MasterPurchaseOrderDTO } from '@wms/dtos';
import {
  IJsonBody,
  IPaginationResp,
  IPaginationProps,
  IBodyProps,
  IParamsProps
} from '@wms/interfaces';
import { MasterPurchaseOrderEntity, PurchaseOrderYearEntity } from '@wms/entities';


export const masterPurchaseOrderListGET = async (options: IPaginationProps<PaginationDTO>): Promise<IJsonBody<IPaginationResp<MasterPurchaseOrderEntity>>> => await httpClient.get({
  url: 'maestropedido',
  options: {
    params: options.params
  }
});

export const masterPurchaseOrderGET = async (options: IParamsProps<MasterPurchaseOrderDTO>): Promise<IJsonBody<MasterPurchaseOrderEntity>> => await httpClient.get({
  url: `maestropedido/${options.params.maestroPedidoId}/`,
  options: {}
});

export const masterPurchaseOrderYearGET = async (options: IParamsProps<{ year: number }>): Promise<IJsonBody<PurchaseOrderYearEntity>> => await httpClient.get({
  url: `maestropedido/reporte/${options.params.year}/estato`,
  options: {}
});

import { httpClient } from '../http-config';
import { PaginationDTO,MasterAccountDTO } from '@wms/dtos';
import {
  IJsonBody,
  IPaginationResp,
  IPaginationProps,
  IBodyProps,
  IParamsProps
} from '@wms/interfaces';
import {  } from '@wms/entities';


export const masterAccountGET = async (options: IParamsProps<MasterAccountDTO>): Promise<IJsonBody<any>> => await httpClient.get({
  url: `maestrocuenta/${options.params.maestroPedidoId}/`,
  options: {}
});

export const assignMasterAccountPOST = async (options: IBodyProps<MasterAccountDTO>): Promise<IJsonBody<boolean>> => await httpClient.post({
  url: 'maestrocuenta/angaza',
  options: {
    data: options.body
  }
});
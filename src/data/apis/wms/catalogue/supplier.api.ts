import { httpClient } from '../http-config';
import { PaginationDTO, SupplierDTO } from '@wms/dtos';
import {
  IJsonBody,
  IPaginationResp,
  IPaginationProps,
  IBodyProps
} from '@wms/interfaces';
import { SupplierEntity } from '@wms/entities';


export const supplierListGET = async (options: IPaginationProps<PaginationDTO>): Promise<IJsonBody<IPaginationResp<SupplierEntity>>> => await httpClient.get({
  url: 'proveedor',
  options: {
    params: options.params
  }
});

export const createSupplierPOST = async (options: IBodyProps<SupplierDTO>): Promise<IJsonBody<SupplierEntity | string>> => await httpClient.post({
  url: 'proveedor',
  options: {
    data: options.body
  }
});

export const updateSupplierPUT = async (options: IBodyProps<SupplierDTO>): Promise<IJsonBody<SupplierEntity | string>> => await httpClient.put({
  url: `proveedor/${options.body.proveedorId}/`,
  options: {
    data: options.body
  }
});

export const eliminateSupplierDELETE = async (options: IBodyProps<SupplierDTO>): Promise<IJsonBody<SupplierEntity | string>> => await httpClient.delete({
  url: `proveedor/${options.body.proveedorId}/`,
  options: {
    data: options.body
  }
});
import { httpClient } from '../http-config';
import { PaginationDTO, MasterEntryDTO } from '@wms/dtos';
import {
  IJsonBody,
  IPaginationResp,
  IPaginationProps,
  IBodyProps,
  IParamsProps
} from '@wms/interfaces';
import { MasterEntryEntity } from '@wms/entities';



export const masterEntryListGET = async (options: IPaginationProps<PaginationDTO>): Promise<IJsonBody<IPaginationResp<MasterEntryEntity>>> => await httpClient.get({
  url: 'maestroentrada',
  options: {
    params: options.params
  }
});

export const masterEntryGET = async (options: IParamsProps<MasterEntryDTO>): Promise<IJsonBody<MasterEntryEntity>> => await httpClient.get({
  url: `maestroentrada/${options.params.maestroEntradaId}/`,
  options: {}
});


export const createMasterEntryPOST = async (options: IBodyProps<MasterEntryDTO>): Promise<IJsonBody<MasterEntryEntity | string>> => await httpClient.post({
  url: 'maestroentrada',
  options: {
    data: options.body
  }
});

export const verifyMasterEntryDetailSeriePOST = async (options: IBodyProps<Array<{ nombre: string }>>): Promise<IJsonBody<Array<{ serie: string, status: boolean }>>> => await httpClient.post({
  url: 'maestroentrada/detalle/verify-numero-serie',
  options: {
    data: options.body
  }
});

export const updateMasterEntryPUT = async (options: IBodyProps<MasterEntryDTO>): Promise<IJsonBody<MasterEntryEntity | string>> => await httpClient.put({
  url: `maestroentrada/${options.body.maestroEntradaId}/`,
  options: {
    data: options.body
  }
});

export const finishMasterEntryPUT = async (options: IParamsProps<MasterEntryDTO>): Promise<IJsonBody<MasterEntryEntity | string>> => await httpClient.put({
  url: `maestroentrada/${options.params.maestroEntradaId}/finalizar`,
  options: {}
});

export const eliminateMasterEntryDELETE = async (options: IParamsProps<MasterEntryDTO>): Promise<IJsonBody<MasterEntryEntity | string>> => await httpClient.delete({
  url: `maestroentrada/${options.params.maestroEntradaId}/`,
  options: {
    data: options.body
  }
});

export const eliminateMasterEntryDetailDELETE = async (options: IParamsProps<MasterEntryDTO>): Promise<IJsonBody<MasterEntryEntity | string>> => await httpClient.delete({
  url: `maestroentrada/${options.params.maestroEntradaId}/delete-detalle`,
  options: {
    data: options.body
  }
});
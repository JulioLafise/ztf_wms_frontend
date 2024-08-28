import { httpClient } from '../http-config';
import { PaginationDTO, MasterDepartureDTO } from '@wms/dtos';
import {
  IJsonBody,
  IPaginationResp,
  IPaginationProps,
  IBodyProps,
  IParamsProps
} from '@wms/interfaces';
import { MasterDepartureEntity, EntryDepartureEntity } from '@wms/entities';


export const masterDepartureListGET = async (options: IPaginationProps<PaginationDTO>): Promise<IJsonBody<IPaginationResp<MasterDepartureEntity>>> => await httpClient.get({
  url: 'maestrosalida',
  options: {
    params: options.params
  }
});

export const masterDepartureGET = async (options: IParamsProps<MasterDepartureDTO>): Promise<IJsonBody<MasterDepartureEntity>> => await httpClient.get({
  url: `maestrosalida/${options.params.maestroSalidaId}/`,
  options: {}
});

export const listEntryDepartureGET = async (options: IParamsProps<{ year: number }>): Promise<IJsonBody<EntryDepartureEntity[]>> => await httpClient.get({
  url: `maestrosalida/linia-d-tiempo/${options.params.year}/entrada-salida`,
  options: {}
});

export const createMasterDeparturePOST = async (options: IBodyProps<MasterDepartureDTO>): Promise<IJsonBody<MasterDepartureEntity | string>> => await httpClient.post({
  url: 'maestrosalida',
  options: {
    data: options.body
  }
});

export const updateMasterDeparturePUT = async (options: IBodyProps<MasterDepartureDTO>): Promise<IJsonBody<MasterDepartureEntity | string>> => await httpClient.put({
  url: `maestrosalida/${options.body.maestroSalidaId}/`,
  options: {
    data: options.body
  }
});

export const finishMasterDeparturePUT = async (options: IParamsProps<MasterDepartureDTO>): Promise<IJsonBody<MasterDepartureEntity | string>> => await httpClient.put({
  url: `maestrosalida/${options.params.maestroSalidaId}/finalizar`,
  options: {}
});

export const eliminateMasterDepartureDELETE = async (options: IParamsProps<MasterDepartureDTO>): Promise<IJsonBody<MasterDepartureEntity | string>> => await httpClient.delete({
  url: `maestrosalida/${options.params.maestroSalidaId}/`,
  options: {}
});

export const eliminateMasterDepartureDetailDELETE = async (options: IParamsProps<MasterDepartureDTO>): Promise<IJsonBody<MasterDepartureEntity | string>> => await httpClient.delete({
  url: `maestrosalida/${options.params.maestroSalidaId}/delete-detalle`,
  options: {
    data: options.body
  }
});
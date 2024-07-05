import { httpClient } from '../http-config';
import { PaginationDTO, EntryTypeDTO } from '@wms/dtos';
import {
  IJsonBody,
  IPaginationResp,
  IPaginationProps,
  IBodyProps
} from '@wms/interfaces';
import { EntryTypeEntity } from '@wms/entities';


export const entryTypeListGET = async (options: IPaginationProps<PaginationDTO>): Promise<IJsonBody<IPaginationResp<EntryTypeEntity>>> => await httpClient.get({
  url: 'tipoentrada',
  options: {
    params: options.params
  }
});

export const createEntryTypePOST = async (options: IBodyProps<EntryTypeDTO>): Promise<IJsonBody<EntryTypeEntity | string>> => await httpClient.post({
  url: 'tipoentrada',
  options: {
    data: options.body
  }
});

export const updateEntryTypePUT = async (options: IBodyProps<EntryTypeDTO>): Promise<IJsonBody<EntryTypeEntity | string>> => await httpClient.put({
  url: `tipoentrada/${options.body.tipoEntradaId}/`,
  options: {
    data: options.body
  }
});

export const eliminateEntryTypeDELETE = async (options: IBodyProps<EntryTypeDTO>): Promise<IJsonBody<EntryTypeEntity | string>> => await httpClient.delete({
  url: `tipoentrada/${options.body.tipoEntradaId}/`,
  options: {
    data: options.body
  }
});
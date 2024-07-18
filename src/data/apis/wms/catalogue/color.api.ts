import { httpClient } from '../http-config';
import { PaginationDTO, ColorDTO } from '@wms/dtos';
import {
  IJsonBody,
  IPaginationResp,
  IPaginationProps,
  IBodyProps
} from '@wms/interfaces';
import { ColorEntity } from '@wms/entities';


export const colorListGET = async (options: IPaginationProps<PaginationDTO>): Promise<IJsonBody<IPaginationResp<ColorEntity>>> => await httpClient.get({
  url: 'tipocolor',
  options: {
    params: options.params
  }
});

export const createColorPOST = async (options: IBodyProps<ColorDTO>): Promise<IJsonBody<ColorEntity | string>> => await httpClient.post({
  url: 'tipocolor',
  options: {
    data: options.body
  }
});

export const updateColorPUT = async (options: IBodyProps<ColorDTO>): Promise<IJsonBody<ColorEntity | string>> => await httpClient.put({
  url: `tipocolor/${options.body.tipoColorId}/`,
  options: {
    data: options.body
  }
});

export const eliminateColorDELETE = async (options: IBodyProps<ColorDTO>): Promise<IJsonBody<ColorEntity | string>> => await httpClient.delete({
  url: `tipocolor/${options.body.tipoColorId}/`,
  options: {
    data: options.body
  }
});
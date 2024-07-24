import { httpClient } from '../http-config';
import { PaginationDTO, UnitMeasureDTO } from '@wms/dtos';
import {
  IJsonBody,
  IPaginationResp,
  IPaginationProps,
  IBodyProps,
  IParamsProps
} from '@wms/interfaces';
import { UnitMeasureEntity } from '@wms/entities';


export const unitMeasureListGET = async (options: IPaginationProps<PaginationDTO>): Promise<IJsonBody<IPaginationResp<UnitMeasureEntity>>> => await httpClient.get({
  url: 'unidadmedida',
  options: {
    params: options.params
  }
});

export const createUnitMeasurePOST = async (options: IBodyProps<UnitMeasureDTO>): Promise<IJsonBody<UnitMeasureEntity | string>> => await httpClient.post({
  url: 'unidadmedida',
  options: {
    data: options.body
  }
});

export const updateUnitMeasurePUT = async (options: IBodyProps<UnitMeasureDTO>): Promise<IJsonBody<UnitMeasureEntity | string>> => await httpClient.put({
  url: `unidadmedida/${options.body.unidadMedidaId}/`,
  options: {
    data: options.body
  }
});

export const eliminateUnitMeasureDELETE = async (options: IParamsProps<UnitMeasureDTO>): Promise<IJsonBody<UnitMeasureEntity | string>> => await httpClient.delete({
  url: `unidadmedida/${options.params.unidadMedidaId}/`,
  options: {
    data: options.body
  }
});
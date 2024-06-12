import { httpClient } from '../http-config';
import { PaginationDTO, FeaturesDTO } from '@wms/dtos';
import {
  IJsonBody,
  IPaginationResp,
  IPaginationProps,
  IBodyProps
} from '@wms/interfaces';
import { FeaturesEntity } from '@wms/entities';


export const featuresListGET = async (options: IPaginationProps<PaginationDTO>): Promise<IJsonBody<IPaginationResp<FeaturesEntity>>> => await httpClient.get({
  url: 'catalogocaracteristica',
  options: {
    params: options.params
  }
});

export const createFeaturesPOST = async (options: IBodyProps<FeaturesDTO>): Promise<IJsonBody<FeaturesEntity | string>> => await httpClient.post({
  url: 'catalogocaracteristica',
  options: {
    data: options.body
  }
});

export const updateFeaturesPUT = async (options: IBodyProps<FeaturesDTO>): Promise<IJsonBody<FeaturesEntity | string>> => await httpClient.put({
  url: `catalogocaracteristica/${options.body.catalogoCaracteristicaId}/`,
  options: {
    data: options.body
  }
});

export const eliminateFeaturesDELETE = async (options: IBodyProps<FeaturesDTO>): Promise<IJsonBody<FeaturesEntity | string>> => await httpClient.delete({
  url: `catalogocaracteristica/${options.body.catalogoCaracteristicaId}/`,
  options: {
    data: options.body
  }
});
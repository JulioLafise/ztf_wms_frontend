import { httpClient } from '../http-config';
import { PaginationDTO, ModelDTO } from '@wms/dtos';
import {
  IJsonBody,
  IPaginationResp,
  IPaginationProps,
  IBodyProps
} from '@wms/interfaces';
import { ModelEntity } from '@wms/entities';


export const modelListGET = async (options: IPaginationProps<PaginationDTO>): Promise<IJsonBody<IPaginationResp<ModelEntity>>> => await httpClient.get({
  url: 'modelo',
  options: {
    params: options.params
  }
});

export const createModelPOST = async (options: IBodyProps<ModelDTO>): Promise<IJsonBody<ModelEntity | string>> => await httpClient.post({
  url: 'modelo',
  options: {
    data: options.body
  }
});

export const updateModelPUT = async (options: IBodyProps<ModelDTO>): Promise<IJsonBody<ModelEntity | string>> => await httpClient.put({
  url: `modelo/${options.body.modeloId}/`,
  options: {
    data: options.body
  }
});

export const eliminateModelDELETE = async (options: IBodyProps<ModelDTO>): Promise<IJsonBody<ModelEntity | string>> => await httpClient.delete({
  url: `modelo/${options.body.modeloId}/`,
  options: {
    data: options.body
  }
});
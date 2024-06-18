import { httpClient } from '../http-config';
import { PaginationDTO, CategoryDTO } from '@wms/dtos';
import {
  IJsonBody,
  IPaginationResp,
  IPaginationProps,
  IBodyProps
} from '@wms/interfaces';
import { CategoryEntity } from '@wms/entities';


export const categoryListGET = async (options: IPaginationProps<PaginationDTO>): Promise<IJsonBody<IPaginationResp<CategoryEntity>>> => await httpClient.get({
  url: 'categoria',
  options: {
    params: options.params
  }
});

export const createCategoryPOST = async (options: IBodyProps<CategoryDTO>): Promise<IJsonBody<CategoryEntity | string>> => await httpClient.post({
  url: 'categoria',
  options: {
    data: options.body
  }
});

export const updateCategoryPUT = async (options: IBodyProps<CategoryDTO>): Promise<IJsonBody<CategoryEntity | string>> => await httpClient.put({
  url: `categoria/${options.body.categoriaId}/`,
  options: {
    data: options.body
  }
});

export const eliminateCategoryDELETE = async (options: IBodyProps<CategoryDTO>): Promise<IJsonBody<CategoryEntity | string>> => await httpClient.delete({
  url: `categoria/${options.body.categoriaId}/`,
  options: {
    data: options.body
  }
});
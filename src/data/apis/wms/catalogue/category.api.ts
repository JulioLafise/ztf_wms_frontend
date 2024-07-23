import { httpClient } from '../http-config';
import { PaginationDTO, CategoryDTO } from '@wms/dtos';
import {
  IJsonBody,
  IPaginationResp,
  IPaginationProps,
  IBodyProps,
  IParamsProps
} from '@wms/interfaces';
import { CategoryEntity, ProductEntity, KitEntity } from '@wms/entities';


export const categoryListGET = async (options: IPaginationProps<PaginationDTO>): Promise<IJsonBody<IPaginationResp<CategoryEntity>>> => await httpClient.get({
  url: 'categoria',
  options: {
    params: options.params
  }
});

export const categoryKitListGET = async (options: IParamsProps<CategoryDTO>): Promise<IJsonBody<KitEntity[]>> => await httpClient.get({
  url: `categoria/${options.params.categoriaId}/catalogo-kit-all`,
  options: {}
});

export const categoryProductListGET = async (options: IParamsProps<CategoryDTO>): Promise<IJsonBody<ProductEntity[]>> => await httpClient.get({
  url: `categoria/${options.params.categoriaId}/product-all`,
  options: {}
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

export const eliminateCategoryDELETE = async (options: IParamsProps<CategoryDTO>): Promise<IJsonBody<CategoryEntity | string>> => await httpClient.delete({
  url: `categoria/${options.params.categoriaId}/`,
  options: {}
});
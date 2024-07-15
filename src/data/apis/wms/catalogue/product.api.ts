import { httpClient } from '../http-config';
import { PaginationDTO, ProductDTO } from '@wms/dtos';
import {
  IJsonBody,
  IPaginationResp,
  IPaginationProps,
  IBodyProps,
  IParamsProps
} from '@wms/interfaces';
import { ProductEntity } from '@wms/entities';


export const productListGET = async (options: IPaginationProps<PaginationDTO>): Promise<IJsonBody<IPaginationResp<ProductEntity>>> => await httpClient.get({
  url: 'producto',
  options: {
    params: options.params
  }
});

export const productGET = async (options: IParamsProps<ProductDTO>): Promise<IJsonBody<ProductEntity | string>> => await httpClient.get({
  url: `producto/${options.params.productoId}/`,
  options: {
    params: options.params
  }
});

export const productNameGET = async (options: IParamsProps<{ name: string }>): Promise<IJsonBody<ProductEntity | { message: string, exist: boolean }>> => await httpClient.get({
  url: 'producto/verify-name',
  options: {
    params: options.params
  }
});

export const createProductPOST = async (options: IBodyProps<ProductDTO>): Promise<IJsonBody<ProductEntity | string>> => await httpClient.post({
  url: 'producto',
  options: {
    data: options.body
  }
});

export const updateProductPUT = async (options: IBodyProps<ProductDTO>): Promise<IJsonBody<ProductEntity | string>> => await httpClient.put({
  url: `producto/${options.body.productoId}/`,
  options: {
    data: options.body
  }
});

export const eliminateProductDELETE = async (options: IParamsProps<ProductDTO>): Promise<IJsonBody<ProductEntity | string>> => await httpClient.delete({
  url: `producto/${options.body.productoId}/`,
  options: {}
});

export const eliminateProductColorsDELETE = async (options: IParamsProps<ProductDTO>): Promise<IJsonBody<ProductEntity | string>> => await httpClient.delete({
  url: `producto/${options.params.productoId}/color`,
  options: {}
});

export const eliminateProductImagesDELETE = async (options: IParamsProps<ProductDTO>): Promise<IJsonBody<ProductEntity | string>> => await httpClient.delete({
  url: `producto/${options.params.productoId}/img`,
  options: {}
});

export const eliminateProductDimensionsDELETE = async (options: IParamsProps<ProductDTO>): Promise<IJsonBody<ProductEntity | string>> => await httpClient.delete({
  url: `producto/${options.params.productoId}/dimension`,
  options: {}
});

export const eliminateProductDetailsDELETE = async (options: IParamsProps<ProductDTO>): Promise<IJsonBody<ProductEntity | string>> => await httpClient.delete({
  url: `producto/${options.params.productoId}/detalle`,
  options: {}
});
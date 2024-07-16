import { httpClient } from '../http-config';
import {
  IJsonBody,
  IBodyProps,
  IParamsProps,
  ImageS3Api
} from '@wms/interfaces';


export const createImageToS3POST = async (options: IBodyProps<File[]>): Promise<IJsonBody<string[]>> => await httpClient.post({
  url: 'awss',
  options: {
    data: options.body,
    headers: {
      'Content-Type': `multipart/form-data; charset=utf-8; boundary=${Math.random().toString().substring(2)};`
    }
  }
});


export const eliminateImageFromS3DELETE = async (options: IParamsProps<{ imageId: string }>): Promise<IJsonBody<ImageS3Api>> => await httpClient.delete({
  url: `awss/${options.params.imageId}/`,
  options: {}
});
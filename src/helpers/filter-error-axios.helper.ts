import { ErrorAxios } from '@interfaces';

export const filterErrorAxios = (error: any) => {
  const errorAxios: ErrorAxios = {
    statusCode: error?.response.status,
    statusText: error?.response.statusText,
    axiosMsg: error?.message,
    message: error?.response.data
  };
  return errorAxios;
};
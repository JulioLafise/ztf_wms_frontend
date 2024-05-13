export interface ErrorAxios {
  statusCode: number,
  statusText: string,
  axiosMsg: string,
  message?: IJsonRequest | undefined
}

interface IJsonRequest {
  message: string,
  status: number
}

export type IValidationErrors<T> = { [X in keyof T]: string };
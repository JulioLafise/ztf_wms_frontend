export interface IHttp {
  params?: any,
  body?: any,
  headers?: any
}

export interface IJsonBody<T>  {
  data: T
  status: string,
  statusCode: number
}

export interface IJsonResponseMIS<T>  {
  detail: T
  status: string,
  statusCode: number
}


export interface IPaginationResp<T> {
  rowsNumber: number,
  pageNumber: number,
  rowsOfPage: number,
  rowsData: T[]
}

export interface IParamsProps<T> extends IHttp {
  params: T
}

export interface IPaginationProps<T> extends IHttp {
  params: T
}

export interface IBodyProps<T> extends IHttp {
  body: T
}

export type IPagination = { pageIndex: number, pageSize: number, filter: string };
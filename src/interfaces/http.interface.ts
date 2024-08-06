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

export interface IJsonResponse<T>  {
  detail: T
  status: string,
  statusCode: number
}


export interface IPayloadJWT {
  sub: string,
  website: string,
  address: { formatted: string },
  given_name: string,
  name: string,
  middle_name: string,
  phone_number: string,
  phone_number_verified: boolean,
  picture: string,
  'cognito:groups': string[],
  email_verified: boolean,
  iss: string,
  'cognito:username': string,
  origin_jti: string,
  aud: string,
  event_id: string,
  token_use: string,
  auth_time: number,
  exp: number,
  iat: number,
  jti: string,
  email: string
}

export interface IPaginationResp<T> {
  count: number,
  data: T[]
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


export interface ImageS3Api {
  deleteMarker:     null;
  versionId:        null;
  requestCharged:   null;
  responseMetadata: ResponseMetadata;
  contentLength:    number;
  httpStatusCode:   number;
}

interface ResponseMetadata {
  requestId:                string;
  metadata:                 Metadata;
  checksumAlgorithm:        number;
  checksumValidationStatus: number;
}

interface Metadata {
  'x-amz-id-2': string;
}

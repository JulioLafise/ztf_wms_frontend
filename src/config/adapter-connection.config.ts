import axiosHttp, {
  Axios,
  AxiosResponse,
  type AxiosInterceptorOptions,
  type InternalAxiosRequestConfig,
  AxiosRequestConfig
} from 'axios';
import { IJsonBody } from '@wms/interfaces';

interface IMethodHttp {
  url: string,
  options?: IHttpOptions
}

interface IHttpOptions {
  headers?: AxiosRequestConfig<any>['headers'],
  params?: any,
  data?: any
}

type OnFulFilledRequest = ((value: InternalAxiosRequestConfig<any>) => InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>>) | null | undefined;
type OnFulFilledResponse = ((value: AxiosResponse<any, any>) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>) | null | undefined;
type OnRejected = ((error: any) => any) | null | undefined;
type OptionsInterceptor = AxiosInterceptorOptions | undefined;
export type ExtraInterceptorRequest = { onFulfilled?: OnFulFilledRequest, onRejected?: OnRejected, options?: OptionsInterceptor };
export type ExtraInterceptorResponse = { onFulfilled?: OnFulFilledResponse, onRejected?: OnRejected, options?: OptionsInterceptor };
export type ExtraInterceptor = { request?: ExtraInterceptorRequest, response?: ExtraInterceptorResponse };
class AdapterConnection {
  private axios!: Axios;

  constructor(
    private baseUrl?: string,
    private extraInterceptor?: ExtraInterceptor
  ) {
    this.initConfig();
  }

  private initConfig() {
    this.axios = axiosHttp.create({
      baseURL: this.baseUrl,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      transformRequest: [(data, headers) => {
        if (headers['Content-Type'] && headers['Content-Type'].toString().startsWith('multipart/form-data')) {
          const { headers: header, params, ...rest } = data;
          const formData = new FormData();
          for (const key in rest) {
            const values: File = rest[key];
            if (Array.isArray(values)) {
              // const arrayKey = `${key}[]`;
              values.forEach((value: File) => {
                formData.append('file', value, values.name);
              });
            } else {
              formData.append('file', values, values.name);
            }
          }
          return formData;
        }
        return JSON.stringify(data);
      }]
    });

    const configReq = this.extraInterceptor?.request;
    this.axios.interceptors.request.use(configReq?.onFulfilled, configReq?.onRejected, configReq?.options);

    const configRes = this.extraInterceptor?.response;
    this.axios.interceptors.response.use(configRes?.onFulfilled, configRes?.onRejected, configRes?.options);
    
  }

  async get<T>({ url, options }: IMethodHttp): Promise<IJsonBody<T>> {
    const { data, status,  statusText } = await this.axios.get<T>(url, {
      headers: options?.headers,
      params: options?.params,
      ...options?.data
    });
    return {
      data, status: statusText, statusCode: status
    };
  }

  async post<T>({ url, options }: IMethodHttp): Promise<IJsonBody<T>> {
    if (Array.isArray(options?.data)) {
      const { data, status, statusText } = await this.axios.post<T>(url, options?.data, {
        headers: options?.headers,
        params: options?.params
      });
  
      return {
        data, status: statusText, statusCode: status
      };      
    } 
    const { data, status, statusText } = await this.axios.post<T>(url, {
      headers: options?.headers,
      params: options?.params,
      ...options?.data
    }, { headers: options?.headers });
  
    return {
      data, status: statusText, statusCode: status
    };
  }

  async put<T>({ url, options }: IMethodHttp): Promise<IJsonBody<T>> {
    const { data, status, statusText } = await this.axios.put<T>(url, {
      headers: options?.headers,
      params: options?.params,
      ...options?.data
    }, { headers: options?.headers });
    return {
      data, status: statusText, statusCode: status
    };
  }

  async patch<T>({ url, options }: IMethodHttp): Promise<IJsonBody<T>> {
    const { data, status, statusText } = await this.axios.patch<T>(url, {
      headers: options?.headers,
      params: options?.params,
      ...options?.data
    }, { headers: options?.headers });
    return {
      data, status: statusText, statusCode: status
    };
  }

  async delete<T>({ url, options }: IMethodHttp): Promise<IJsonBody<T>> {
    const { data, status, statusText } = await this.axios.delete<T>(url, {
      headers: options?.headers,
      params: options?.params,
      ...options?.data
    });
    return {
      data, status: statusText, statusCode: status
    };
  }
}

export default AdapterConnection;
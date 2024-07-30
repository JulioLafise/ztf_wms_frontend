import axios, { type AxiosRequestHeaders } from 'axios';
import type {
  ExtraInterceptor,
  ExtraInterceptorRequest,
  ExtraInterceptorResponse
} from './adapter-connection.config';
import { LocalStorageConfig } from './local-storage.config';
import { enviroment } from './enviroments.config';

export class HttpWMS {

  static interceptors(): ExtraInterceptor {
    return {
      request: this.interceptorRequest(),
      response: this.interceptorResponse()
    };
  }

  private static interceptorRequest(): ExtraInterceptorRequest {
    return {
      onFulfilled: (config) => {
        config.headers = <any>{
          ...config.headers,
          Authorization: `Bearer ${LocalStorageConfig.getItem<string>('token', 'string', '')}`,
          RefreshToken: LocalStorageConfig.getItem<string>('rftk', 'string', '')
        };
        return config;
      },
      onRejected: (error) => Promise.reject(error)
    };
  }

  private static interceptorResponse(): ExtraInterceptorResponse {
    return {
      onFulfilled: (response) => response,
      onRejected:  async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {            
            
            // return axios(originalRequest);
          } catch (error) {
            // Handle refresh token error

          }
        }
        return Promise.reject(error);
      }
    };
  }
}
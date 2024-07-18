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
        config.headers = <AxiosRequestHeaders>{
          ...config.headers,
          Authorization: `Bearer ${LocalStorageConfig.getItem<string>('token', 'string', '')}`
        };
        return config;
      }
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
            const axiosHttp = axios.create({
              baseURL: enviroment.apiUrl,
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            });
            const { data, status } = await axiosHttp.post('/security/auth/refresh/', { ...LocalStorageConfig.getItems().auth });

            const statusError = [ 400, 404, 401, 500 ];
            if (statusError.includes(status)) throw new Error(data.detail);
            
            const token = data.detail.idToken;

            LocalStorageConfig.setItem('token', token);
            LocalStorageConfig.setItem('acstk', data.detail.accessToken);
            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          } catch (error) {
            // Handle refresh token error
            LocalStorageConfig.removeItems(['expire', 'token', 'sid', 'rftk', 'acstk']);
            window.location.reload();
          }
        }
        return Promise.reject(error);
      }
    };
  }
}
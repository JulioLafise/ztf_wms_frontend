import { AdapterConnection, enviroment as config, HttpWMS } from '@wms/config';

export const httpClient = new AdapterConnection(config.apiUrl, HttpWMS.interceptors());
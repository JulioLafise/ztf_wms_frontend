import { httpClient } from '../http-config';
import { PaginationDTO } from '@wms/dtos';
import {
  IJsonBody,
  IPaginationResp,
  IPaginationProps,
  IBodyProps
} from '@wms/interfaces';
import { CountryEntity } from '@wms/entities';


export const countryListGET = async (options: IPaginationProps<PaginationDTO>): Promise<IJsonBody<IPaginationResp<CountryEntity>>> => await httpClient.get({
  url: 'country',
  options: {
    params: options.params
  }
});

export const countryGET = async (options: IBodyProps<{ countryId: number }>): Promise<IJsonBody<CountryEntity>> => await httpClient.get({
  url: `country/${options.body.countryId}/`,
  options: {}
});

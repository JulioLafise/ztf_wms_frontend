import { httpClient } from '../http-config';
import { PaginationDTO } from '@wms/dtos';
import {
  IJsonBody,
  IPaginationResp,
  IPaginationProps,
  IBodyProps
} from '@wms/interfaces';
import { DepartureTypeEntity } from '@wms/entities';


export const departureTypeListGET = async (options: IPaginationProps<PaginationDTO>): Promise<IJsonBody<IPaginationResp<DepartureTypeEntity>>> => await httpClient.get({
  url: 'tiposalida',
  options: {
    params: options.params
  }
});
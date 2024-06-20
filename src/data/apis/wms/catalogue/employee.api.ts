import { httpClient } from '../http-config';
import { PaginationDTO, EmployeeDTO } from '@wms/dtos';
import {
  IJsonBody,
  IPaginationResp,
  IPaginationProps,
  IBodyProps
} from '@wms/interfaces';
import { EmployeeEntity } from '@wms/entities';


export const employeeListGET = async (options: IPaginationProps<PaginationDTO>): Promise<IJsonBody<IPaginationResp<EmployeeEntity>>> => await httpClient.get({
  url: 'empleado',
  options: {
    params: options.params
  }
});

export const createEmployeePOST = async (options: IBodyProps<EmployeeDTO>): Promise<IJsonBody<EmployeeEntity | string>> => await httpClient.post({
  url: 'empleado',
  options: {
    data: options.body
  }
});

export const updateEmployeePUT = async (options: IBodyProps<EmployeeDTO>): Promise<IJsonBody<EmployeeEntity | string>> => await httpClient.put({
  url: `empleado/${options.body.empleadoId}/`,
  options: {
    data: options.body
  }
});

export const eliminateEmployeeDELETE = async (options: IBodyProps<EmployeeDTO>): Promise<IJsonBody<EmployeeEntity | string>> => await httpClient.delete({
  url: `empleado/${options.body.empleadoId}/`,
  options: {
    data: options.body
  }
});
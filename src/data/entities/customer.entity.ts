import { DepartamentEntity } from './';


export class CustomerEntity {
  constructor(
    public customerId?: number,
    public code?: string,
    public customerUuid?: string,
    public firstName?: string,
    public lastName?: string,
    public cellphone?: string,
    public email?: string,
    public address?: string,
    public identificationCard?: string,
    public departamentId?: DepartamentEntity,
    public isActive?: boolean
  ) {}
}
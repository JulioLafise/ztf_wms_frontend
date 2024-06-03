import { DepartamentEntity } from './';

export class SupplierEntity {
  constructor(
    public supplierId?: number,
    public code?: string,
    public firstName?: string,
    public lastName?: string,
    public cellphone?: string,
    public email?: string,
    public address?: string,
    public departament?: DepartamentEntity,
    public isActive?: string,
  ) {}
}
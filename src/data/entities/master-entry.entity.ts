import {
  CategoryEntity,
  DepartamentEntity,
  DetailEntryEntity,
  EmployeeEntity,
  SupplierEntity,
  TypeCurrencyEntity,
  WarehouseEntity,
} from './';

export class MasterEntryEntity {
  constructor(
    public masterEntryId?: number,
    public code?: string,
    public description?: string,
    public delivery?: string,
    public employee?: EmployeeEntity,
    public supplier?: SupplierEntity,
    public typeCurrency?: TypeCurrencyEntity,
    public category?: CategoryEntity,
    public details?: DetailEntryEntity[],
    public departament?: DepartamentEntity,
    public warehouse?: WarehouseEntity,
    public isFinish?: boolean,
    public isActive?: boolean,
    public createdAt?: Date,
    public createdBy?: string,
  ) {}
}
import {
  CustomerEntity,
  DepartureTypeEntity,
  DetailDepartureEntity,
  EmployeeEntity,
  TypeCurrencyEntity,
} from './';

export class MasterDepartureEntity {
  constructor(
    public masterDepartureId?: number,
    public code?: string,
    public purchaseOrderCode?: string,
    public description?: string,
    public customer?: CustomerEntity,
    public employee?: EmployeeEntity,
    public typeCurrency?: TypeCurrencyEntity,
    public departureType?: DepartureTypeEntity,
    public details?: DetailDepartureEntity[],
    public isFinish?: boolean,
    public isEcommerce?: boolean,
    public isActive?: boolean,
    public createdAt?: Date,
    public createdBy?: string,
  ) {}
}
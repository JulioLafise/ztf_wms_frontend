import { CustomerEntity } from './';

export class CustomerStockEntity {
  constructor(
    public inventoryId?: number,
    public batchCode?: string,
    public serieNumber?: string,
    public status?: string,
    public product?: string,
    public customer?: CustomerEntity,
    public accountStatus?: string,
    public accountCreatedAt?: Date,
    public isActive?: boolean,
    public isLock?: boolean,
    public accountAngaza?: string,
  ) {}
}
import { CustomerEntity } from './';

export class CustomerStockEntity {
  constructor(
    public inventoryId?: number,
    public batchCode?: string,
    public serieNumber?: string,
    public status?: string,
    public product?: string,
    public customerUuid?: string,
    public firstName?: string,
    public lastName?: string,
    public cellphone?: string,
    public email?: string,
    public address?: string,
    public identificationCard?: string,
    public accountStatus?: string,
    public accountCreatedAt?: Date,
    public isActive?: boolean,
    public isLock?: boolean,
    public accountAngaza?: string,
  ) {}
}
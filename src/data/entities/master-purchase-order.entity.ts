import { TypeCurrencyEntity, DetailPurchaseOrderEntity, CustomerEntity } from './';

export class MasterPurchaseOrderEntity {
  constructor(
    public masterPurchaseOrderId?: number,
    public code?: string,
    public firstName?: string,
    public lastName?: string,
    public phone?: string,
    public identificationCard?: string,
    public price?: number,
    public customer?: CustomerEntity,
    public customerCognitoId?: string,
    public email?: string,
    public description?: string,
    public address?: string,
    public paymentMethod?: string,
    public productName?: string,
    public productId?: number,
    public priceGroupId?: string,
    public pay?: number,
    public codePO?: string,
    public supplierPO?: string,
    public typeCurrency?: TypeCurrencyEntity,
    public details?: DetailPurchaseOrderEntity[],
    public status?: string,
    public date?: Date,
    public isActive?: boolean
  ) {}
}
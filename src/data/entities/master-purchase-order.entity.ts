import { TypeCurrencyEntity, DetailPurchaseOrderEntity, CustomerEntity } from './';

export class MasterPurchaseOrderEntity {
  constructor(
    public masterPurchaseOrderId?: number,
    public masterAccountId?: number,
    public inventoryId?: number,
    public code?: string,
    public price?: number,
    public customer?: CustomerEntity,
    public customerCognitoId?: string,
    public description?: string,
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
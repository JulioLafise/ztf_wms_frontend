import { PricesGroupEntity, ProductEntity } from './';

export class DetailPurchaseOrderEntity {
  constructor(
    public detailPurchaseOrderId?: number,
    public productName?: string,
    public description?: string,
    public dimension?: string,
    public color?: string,
    public image?: string,
    public price?: number,
    public subtotal?: number,
    public quanty?: number,
    public payment?: number,
    public product?: ProductEntity,
    public priceGroup?: PricesGroupEntity
  ) {}
}
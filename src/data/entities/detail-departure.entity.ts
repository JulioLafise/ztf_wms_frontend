import { ProductEntity, ProductStatusEntity } from './';

export class DetailDepartureEntity {
  constructor(
    public detailDepartureId?: number,
    public description?: string,
    public lot?: string,
    public quanty?: number,
    public price?: number,
    public serie?: string,
    public masterDepartureId?: number,
    public product?: ProductEntity,
    public productStatus?: ProductStatusEntity,
    public inventoryId?: number,
    public isNew?: boolean
  ) {}
}
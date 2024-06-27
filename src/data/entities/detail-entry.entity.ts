import { ProductEntity, ProductStatusEntity } from './';

export class DetailEntryEntity {
  constructor(
    public detailEntryId?: number,
    public description?: string,
    public lot?: string,
    public quanty?: number,
    public price?: number,
    public serie?: string,
    public masterEntryId?: number,
    public product?: ProductEntity,
    public productStatus?: ProductStatusEntity,
  ) {}
}
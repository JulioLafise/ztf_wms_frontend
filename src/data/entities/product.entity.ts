import {
  CategoryEntity,
  ModelEntity,
  ProductDetailEntity,
  ProductImageEntity,
  UnitMeasureEntity
} from './';

export class ProductEntity {
  constructor(
    public productId?: number,
    public code?: string,
    public name?: string,
    public description?: string,
    public minimum?: number,
    public model?: ModelEntity,
    public category?: CategoryEntity,
    public unitMeasure?: UnitMeasureEntity,
    public images?: ProductImageEntity[],
    public details?: ProductDetailEntity[],
    public isActive?: boolean
  ) {}
}
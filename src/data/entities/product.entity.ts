import {
  CategoryEntity,
  ColorEntity,
  ModelEntity,
  ProductDetailEntity,
  ProductDimensionEntity,
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
    public colors?: ColorEntity[],
    public dimensions?: ProductDimensionEntity[],
    public images?: ProductImageEntity[],
    public details?: ProductDetailEntity[],
    public isEcommerce?: boolean,
    public isActive?: boolean
  ) {}
}
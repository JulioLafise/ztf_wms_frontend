import { UnitMeasureEntity } from './';

export class ProductDimensionEntity {
  constructor(
    public dimensionId?: number,
    public unitMeasure?: UnitMeasureEntity,
    public description?: string
  ) {}
}
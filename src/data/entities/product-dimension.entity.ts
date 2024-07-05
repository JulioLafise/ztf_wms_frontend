import { UnitMeasureEntity } from './';

export class ProductDimensionEntity {
  constructor(
    public unitMeasure?: UnitMeasureEntity,
    public description?: string
  ) {}
}
import { BrandEntity } from './';

export class ModelEntity {
  constructor(
    public modelId?: number,
    public description?: string,
    public brand?: BrandEntity,
    public isActive?: boolean
  ) {}
}
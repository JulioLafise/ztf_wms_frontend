

export class ProductDetailEntity {
  constructor(
    public productDetailId?: number,
    public description?: string,
    public productId?: number,
    public featureId?: number,
    public isActive?: boolean
  ) {}
}
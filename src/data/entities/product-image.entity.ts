

export class ProductImageEntity {
  constructor(
    public productImageId: number,
    public url?: string,
    public productId?: number
  ) {}
}
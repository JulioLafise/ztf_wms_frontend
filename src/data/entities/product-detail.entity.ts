import { KitDetailEntity } from './';

export class ProductDetailEntity {
  constructor(
    public productDetailId?: number,
    public description?: string,
    public productId?: number,
    public kitName?: string,
    public kitDetail?: KitDetailEntity,
    public isActive?: boolean
  ) {}
}
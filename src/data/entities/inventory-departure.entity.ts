import { ProductEntity } from './';

export class InventoryDepartureEntity {
  constructor(
    public inventoryId?: number,
    public product?: ProductEntity,
    public serie?: string,
    public ticket?: string
  ) {}
}
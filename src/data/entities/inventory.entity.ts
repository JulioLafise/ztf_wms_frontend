
export class InventoryEntity {
  constructor(
    public inventoryId?: number,
    public quanty?: number,
    public description?: string,
    public code?: string,
    public category?: string,
    public model?: string,
    public brand?: string,
    public unitMeasure?: string
  ) {}
}


export class AvailableStockEntity {
  constructor(
    public inventoryId?: number,
    public batchCode?: string,
    public serieNumber?: string,
    public status?: string,
    public product?: string,
    public category?: string,
    public isEcommerce?: boolean,
  ) {}
}
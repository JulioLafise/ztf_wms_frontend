

export class PurchaseOrderYearEntity {
  constructor(
    public year?: string,
    public month?: string,
    public status?: string,
    public count?: number
  ) {}
}
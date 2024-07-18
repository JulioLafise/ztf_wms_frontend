

export class PricesGroupEntity {
  constructor(
    public billingType?: string,
    public initialPayment?: number,
    public gracePeriodDays?: number,
    public monthlyPayment?: number,
    public paymentDayInterval?: number,
    public total?: number,
    public name?: string,
    public description?: string,
  ) {}
}
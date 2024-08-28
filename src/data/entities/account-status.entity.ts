

export class AccountStatusEntity {
  constructor(
    public month?: string,
    public status?: string,
    public count?: number,
    public amount?: number
  ) {}
}
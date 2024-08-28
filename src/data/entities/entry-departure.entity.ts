

export class EntryDepartureEntity {
  constructor(
    public month?: string,
    public count?: number,
    public type?: 'entry' | 'departure'
  ) {}
}
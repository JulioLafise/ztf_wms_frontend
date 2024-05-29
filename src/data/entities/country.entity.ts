import { DepartamentEntity } from './';

export class CountryEntity {
  constructor(
    public countryId?: number,
    public description?: string,
    public departaments?: DepartamentEntity[],
    public isActive?: boolean,
  ) {}
}
import { CountryEntity } from './';

export class EmployeeEntity {
  constructor(
    public employeeId?: number,
    public code?: string,
    public firstName?: string,
    public lastName?: string,
    public countries?: CountryEntity[],
    public isActive?: boolean
  ) {}
}
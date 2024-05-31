import { DepartamentEntity } from './';

export class WarehouseEntity {
  constructor(
    public warehouseId?: number,
    public description?: string,
    public departament?: DepartamentEntity,
    public isActive?: boolean
  ) {}
}
import { FeaturesEntity } from './';


export class KitDetailEntity {
  constructor(
    public kitDetailId?: number,
    public description?: string,
    public kitId?: number,
    public feature?: FeaturesEntity,
    public isActive?: boolean,
  ) {}
}
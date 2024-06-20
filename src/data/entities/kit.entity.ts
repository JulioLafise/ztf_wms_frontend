import { CategoryEntity, KitDetailEntity } from './';


export class KitEntity {
  constructor(
    public kitId?: number,
    public description?: string,
    public category?: CategoryEntity,
    public details?: Array<KitDetailEntity>,
    public isActive?: boolean
  ) {}
}
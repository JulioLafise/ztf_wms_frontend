import { ColorEntity } from '.';


export class ProductColorEntity {
  constructor(
    public productColorId?: number,
    public colorId?: number,
    public color?: string,
    public isActive?: boolean,
  ) {
    // super();
  }
}

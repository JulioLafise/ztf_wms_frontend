import { ColorEntity } from '.';


export class ProductColorEntity extends ColorEntity {
  constructor(public productColorId?: number) {
    super();
  }
}

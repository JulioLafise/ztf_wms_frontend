import { ProductStatusEntity } from '@wms/entities';
import { Validator } from '@wms/helpers';

export class ProductStatusMapper {
  constructor() {}

  static getItem(values: unknown): ProductStatusEntity {
    let data: ProductStatusEntity = {};
    if (!Validator.isObjectEmpty(values as any)){
      const value: any = values;
      data = {
        productStatusId: value.estadoProductoId,
        description: value.descripcion,
        isActive: value.isActivo
      };
    } else throw new Error('An object was expected');
    return data;
  }

  static getList(values: unknown): ProductStatusEntity[] {
    let data: ProductStatusEntity[] = [];
    if (Array.isArray(values)){
      values.forEach(value => {
        data = [
          ...data,
          {
            productStatusId: value.estadoProductoId,
            description: value.descripcion,
            isActive: value.isActivo
          }
        ];
      });
    } else throw new Error('An array was expected');
    return data;
  }

}
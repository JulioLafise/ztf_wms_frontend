import { BrandEntity } from '@wms/entities';
import { Validator } from '@wms/helpers';

export class BrandMapper {
  constructor() {}

  static getItem(values: unknown): BrandEntity {
    let data: BrandEntity = {};
    if (!Validator.isObjectEmpty(values as any)){
      const value: any = values;
      data = {
        brandId: value.marcaId,
        description: value.descripcion,
        isActive: value.isActivo
      };
    } else throw new Error('An object was expected');
    return data;
  }

  static getList(values: unknown): BrandEntity[] {
    let data: BrandEntity[] = [];
    if (Array.isArray(values)){
      values.forEach(value => {
        data = [
          ...data,
          {
            brandId: value.marcaId,
            description: value.descripcion,
            isActive: value.isActivo
          }
        ];
      });
    } else throw new Error('An array was expected');
    return data;
  }

}
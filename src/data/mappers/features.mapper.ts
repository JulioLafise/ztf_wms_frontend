import { FeaturesEntity } from '@wms/entities';
import { Validator } from '@wms/helpers';

export class FeaturesMapper {
  constructor() {}

  static getItem(values: unknown): FeaturesEntity {
    let data: FeaturesEntity = {};
    if (!Validator.isObjectEmpty(values as any)){
      const value: any = values;
      data = {
        featuresId: value.catalogoCaracteristicaId,
        description: value.descripcion,
        isActive: value.isActivo
      };
    } else throw new Error('An object was expected');
    return data;
  }

  static getList(values: unknown): FeaturesEntity[] {
    let data: FeaturesEntity[] = [];
    if (Array.isArray(values)){
      values.forEach(value => {
        data = [
          ...data,
          {
            featuresId: value.catalogoCaracteristicaId,
            description: value.descripcion,
            isActive: value.isActivo
          }
        ];
      });
    } else throw new Error('An array was expected');
    return data;
  }

}
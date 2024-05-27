import { UnitMeasureEntity } from '@wms/entities';
import { Validator } from '@wms/helpers';

export class UnitMeasureMapper {
  constructor() {}

  static getItem(values: unknown): UnitMeasureEntity {
    let data: UnitMeasureEntity = {};
    if (!Validator.isObjectEmpty(values as any)){
      const value: any = values;
      data = {
        unitMeasureId: value.unidadMedidaId,
        description: value.descripcion,
        abbreviation: value.abreviacion,
        isActive: value.isActivo
      };
    } else throw new Error('An object was expected');
    return data;
  }

  static getList(values: unknown): UnitMeasureEntity[] {
    let data: UnitMeasureEntity[] = [];
    if (Array.isArray(values)){
      values.forEach(value => {
        data = [
          ...data,
          {
            unitMeasureId: value.unidadMedidaId,
            description: value.descripcion,
            abbreviation: value.abreviacion,
            isActive: value.isActivo
          }
        ];
      });
    } else throw new Error('An array was expected');
    return data;
  }

}
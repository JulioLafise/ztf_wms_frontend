import { DepartureTypeEntity } from '@wms/entities';
import { Validator } from '@wms/helpers';

export class DepartureTypeMapper {
  constructor() {}

  static getItem(values: unknown): DepartureTypeEntity {
    let data: DepartureTypeEntity = {};
    if (!Validator.isObjectEmpty(values as any)){
      const value: any = values;
      data = {
        departureTypeId: value.tipoSalidaId,
        description: value.descripcion,
        isActive: value.isActivo
      };
    } else throw new Error('An object was expected');
    return data;
  }

  static getList(values: unknown): DepartureTypeEntity[] {
    let data: DepartureTypeEntity[] = [];
    if (Array.isArray(values)){
      values.forEach(value => {
        data = [
          ...data,
          {
            departureTypeId: value.tipoSalidaId,
            description: value.descripcion,
            isActive: value.isActivo
          }
        ];
      });
    } else throw new Error('An array was expected');
    return data;
  }

}
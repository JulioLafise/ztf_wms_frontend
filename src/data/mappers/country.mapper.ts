import { CountryEntity, DepartamentEntity } from '@wms/entities';
import { Validator } from '@wms/helpers';

export class CountryMapper {
  constructor() { }

  static getItem(values: unknown): CountryEntity {
    let data: CountryEntity = {};
    if (!Validator.isObjectEmpty(values as any)) {
      const value: any = values;
      data = {
        countryId: value.paisId,
        description: value.descripcion,
        departaments: this.getDepartamentList(value),
        isActive: value.isActivo
      };
    } else throw new Error('An object was expected');
    return data;
  }

  static getList(values: unknown): CountryEntity[] {
    let data: CountryEntity[] = [];
    if (Array.isArray(values)) {
      values.forEach(value => {
        data = [
          ...data,
          {
            countryId: value.paisId,
            description: value.descripcion,
            isActive: value.isActivo
          }
        ];
      });
    } else throw new Error('An array was expected');
    return data;
  }

  static getDepartamentList(values: unknown): DepartamentEntity[] {
    let data: DepartamentEntity[] = [];
    const value: any = values;
    if (Array.isArray(value.departamentos)) {
      value.departamentos.forEach((item: any) => {
        data = [
          ...data,
          {
            departamentId: item.departamentoId,
            description: item.descripcion,
            isActive: item.isActivo
          }
        ];
      });
    } else throw new Error('An array was expected');
    return data;
  }


}
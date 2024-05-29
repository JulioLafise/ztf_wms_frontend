import { CountryEntity, DepartamentEntity } from '@wms/entities';
import { Validator } from '@wms/helpers';

export class CountryMapper {
  constructor() { }

  static getItem(values: unknown): CountryEntity {
    let data: CountryEntity = {};
    if (!Validator.isObjectEmpty(values as any)) {
      const value: any = values;
      data = {
        countryId: value.countryId,
        description: value.descripcion,
        departaments: [...value.departament],
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
            countryId: value.countryId,
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
    if (Array.isArray(value.departament)) {
      value.departament.forEach((item: any) => {
        data = [
          ...data,
          {
            departamentId: item.departamentId,
            description: item.descripcion,
            isActive: item.isActivo
          }
        ];
      });
    } else throw new Error('An array was expected');
    return data;
  }


}
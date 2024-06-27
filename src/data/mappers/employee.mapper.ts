import { EmployeeEntity, CountryEntity } from '@wms/entities';
import { Validator } from '@wms/helpers';

export class EmployeeMapper {
  constructor() {}

  static getItem(values: unknown): EmployeeEntity {
    let data: EmployeeEntity = {};
    if (!Validator.isObjectEmpty(values as any)){
      const value: any = values;
      data = {
        employeeId: value.empleadoId,
        code: value.codigo,
        firstName: value.nombre,
        lastName: value.apellido,
        countries: this.getCountriesList(value.listaPais),
        isActive: value.isActivo
      };
    } else throw new Error('An object was expected');
    return data;
  }

  static getList(values: unknown): EmployeeEntity[] {
    let data: EmployeeEntity[] = [];
    if (Array.isArray(values)){
      values.forEach(value => {
        data = [
          ...data,
          {
            employeeId: value.empleadoId,
            code: value.codigo,
            firstName: value.nombre,
            lastName: value.apellido,
            countries: this.getCountriesList(value.listaPais),
            isActive: value.isActivo
          }
        ];
      });
    } else throw new Error('An array was expected');
    return data;
  }
  
  private static getCountriesList(values: unknown): CountryEntity[] {
    let data: CountryEntity[] = [];
    const value: any = values;
    if (Array.isArray(value)) {
      value.forEach((item: any) => {
        data = [
          ...data,
          {
            countryId: item.paisId,
            description: item.descripcion,
            isActive: item.isActivo
          }
        ];
      });
    } else throw new Error('An array was expected');
    return data;
  }

}
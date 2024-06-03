import * as Yup from 'yup';

const schemaPOST: Yup.ObjectSchema<EmployeeDTO> = Yup.object().shape({
  empleadoId: Yup.number(),
  codigo: Yup.string().required(),
  nombre: Yup.string().required(),
  apellido: Yup.string().required(),
  listaPais: Yup.array<Country>().required(),
  isActivo: Yup.boolean()
});

const schemaPATCH: Yup.ObjectSchema<EmployeeDTO> = Yup.object().shape({
  empleadoId: Yup.number().required(),
  codigo: Yup.string(),
  nombre: Yup.string(),
  apellido: Yup.string(),
  listaPais: Yup.array<Country>(),
  isActivo: Yup.boolean()
});

type Country = { paisId: number, isActivo: boolean };

export class EmployeeDTO {

  public empleadoId?: number;

  public codigo?: string;

  public nombre?: string;

  public apellido?: string;

  public listaPais?: Array<Country>;

  public isActivo?: boolean;

  static async created(data: { [key: string]: any }): Promise<[any?, EmployeeDTO?]>
  {
    try {
      const dto = new EmployeeDTO();

      dto.empleadoId = data.employeeId || 0;
      dto.codigo = data.code;
      dto.nombre = data.firstName;
      dto.apellido = data.lastName;
      let countries: any[] = [];
      if (Array.isArray(data.countries)) {
        data.countries.forEach(value => {
          countries = [
            ...countries,
            {
              paisId: value.countryId,
              isActivo: value.isActive
            }
          ];
        });
      }
      dto.listaPais = countries;
      dto.isActivo = data.isActive;

      await schemaPOST.validate(dto, { abortEarly: false });

      return [
        undefined,
        dto
      ];
    } catch (error) {
      if (error instanceof Yup.ValidationError)
        return [error.errors];
      throw new Error();
    }
  }

  static async updated(data: { [key: string]: any }): Promise<[any?, EmployeeDTO?]>
  {
    try {
      const dto = new EmployeeDTO();

      dto.empleadoId = data.employeeId;
      dto.codigo = data.code;
      dto.nombre = data.firstName;
      dto.apellido = data.lastName;
      let countries: any[] = [];
      if (Array.isArray(data.countries)) {
        data.countries.forEach(value => {
          countries = [
            ...countries,
            {
              paisId: value.countryId,
              isActivo: value.isActive
            }
          ];
        });
      }
      dto.listaPais = countries;
      dto.isActivo = data.isActive;

      await schemaPATCH.validate(dto, { abortEarly: false });

      return [
        undefined,
        dto
      ];
    } catch (error) {
      if (error instanceof Yup.ValidationError)
        return [error.errors];
      throw new Error();
    }
  }

}
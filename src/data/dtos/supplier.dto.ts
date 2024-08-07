import * as Yup from 'yup';

const schemaPOST: Yup.ObjectSchema<SupplierDTO> = Yup.object().shape({
  proveedorId: Yup.number(),
  codigo: Yup.string(),
  nombre: Yup.string().required(),
  apellido: Yup.string().required(),
  celular: Yup.string().required(),
  email: Yup.string().required(),
  direccion: Yup.string().required(),
  departamentoId: Yup.number().required(),
  isActivo: Yup.boolean()
});

const schemaPATCH: Yup.ObjectSchema<SupplierDTO> = Yup.object().shape({
  proveedorId: Yup.number().required(),
  codigo: Yup.string(),
  nombre: Yup.string(),
  apellido: Yup.string(),
  celular: Yup.string(),
  email: Yup.string(),
  direccion: Yup.string(),
  departamentoId: Yup.number(),
  isActivo: Yup.boolean()
});


export class SupplierDTO {

  public proveedorId?: number;

  public codigo?: string;

  public nombre?: string;

  public apellido?: string;

  public celular?: string;

  public email?: string;

  public direccion?: string;

  public departamentoId?: number;

  public isActivo?: boolean;

  static async created(data: { [key: string]: any }): Promise<[any?, SupplierDTO?]>
  {
    try {
      const dto = new SupplierDTO();

      dto.proveedorId = data.supplierId || 0;
      dto.codigo = data.code;
      dto.nombre = data.firstName;
      dto.apellido = data.lastName;
      dto.celular = data.cellphone;
      dto.email = data.email;
      dto.direccion = data.address;
      dto.departamentoId = data.departament ? data.departament.departamentId : data.departamentId;
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

  static async updated(data: { [key: string]: any }): Promise<[any?, SupplierDTO?]>
  {
    try {
      const dto = new SupplierDTO();

      dto.proveedorId = data.supplierId;
      dto.codigo = data.code;
      dto.nombre = data.firstName;
      dto.apellido = data.lastName;
      dto.celular = data.cellphone;
      dto.email = data.email;
      dto.direccion = data.address;
      dto.departamentoId = data.departament ? data.departament.departamentId : data.departamentId;
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
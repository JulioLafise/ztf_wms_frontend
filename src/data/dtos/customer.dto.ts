import * as Yup from 'yup';

const schemaPOST: Yup.ObjectSchema<CustomerDTO> = Yup.object().shape({
  clienteId: Yup.number(),
  codigo: Yup.string(),
  clienteUuid: Yup.string().nullable(),
  nombre: Yup.string().required(),
  apellido: Yup.string().required(),
  celular: Yup.string().required(),
  email: Yup.string().required(),
  direccion: Yup.string().required(),
  cedula: Yup.string().required(),
  departamentoId: Yup.number().required(),
  isActivo: Yup.boolean()
});

const schemaPATCH: Yup.ObjectSchema<CustomerDTO> = Yup.object().shape({
  clienteId: Yup.number().required(),
  codigo: Yup.string(),
  clienteUuid: Yup.string().nullable(),
  nombre: Yup.string(),
  apellido: Yup.string(),
  celular: Yup.string(),
  email: Yup.string(),
  direccion: Yup.string(),
  cedula: Yup.string(),
  departamentoId: Yup.number(),
  isActivo: Yup.boolean()
});


export class CustomerDTO {

  public clienteId?: number;

  public codigo?: string;

  public clienteUuid?: string | null;

  public nombre?: string;

  public apellido?: string;

  public celular?: string;

  public email?: string;

  public direccion?: string;

  public cedula?: string;

  public departamentoId?: number;

  public isActivo?: boolean;

  static async created(data: { [key: string]: any }): Promise<[any?, CustomerDTO?]>
  {
    try {
      const dto = new CustomerDTO();

      dto.clienteId = data.customerId || 0;
      dto.codigo = data.code;
      dto.clienteUuid = data.customerUuid;
      dto.nombre = data.firstName;
      dto.apellido = data.lastName;
      dto.celular = data.cellphone;
      dto.email = data.email;
      dto.direccion = data.address;
      dto.cedula = data.identificationCard;
      dto.departamentoId = data.brand ? data.departament.departamentId : data.departamentId;
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

  static async updated(data: { [key: string]: any }): Promise<[any?, CustomerDTO?]>
  {
    try {
      const dto = new CustomerDTO();

      dto.clienteId = data.customerId;
      dto.codigo = data.code;
      dto.clienteUuid = data.customerUuid;
      dto.nombre = data.firstName;
      dto.apellido = data.lastName;
      dto.celular = data.cellphone;
      dto.email = data.email;
      dto.direccion = data.address;
      dto.cedula = data.identificationCard;
      dto.departamentoId = data.brand ? data.departament.departamentId : data.departamentId;
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
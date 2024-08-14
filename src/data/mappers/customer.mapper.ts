import { CustomerEntity } from '@wms/entities';
import { Validator } from '@wms/helpers';

export class CustomerMapper {
  constructor() {}

  static getItem(values: unknown): CustomerEntity {
    let data: CustomerEntity = {};
    if (!Validator.isObjectEmpty(values as any)){
      const value: any = values;
      data = {
        customerId: value.clienteId,
        code: value.codigo,
        customerUuid: value.clienteUuid,
        firstName: value.nombre,
        lastName: value.apellido,
        cellphone: value.celular,
        email: value.email,
        address: value.direccion,
        identificationCard: value.cedula,
        departament: {
          departamentId: value.departamentoId,
          description: value.departamento.descripcion,
          countryId: value.departamento.paisId,
        },
        isActive: value.isActivo
      };
    } else throw new Error('An object was expected');
    return data;
  }

  static getList(values: unknown): CustomerEntity[] {
    let data: CustomerEntity[] = [];
    if (Array.isArray(values)){
      values.forEach(value => {
        data = [
          ...data,
          {
            customerId: value.clienteId,
            code: value.codigo,
            customerUuid: value.clienteUuid,
            firstName: value.nombre,
            lastName: value.apellido,
            cellphone: value.celular,
            email: value.email,
            address: value.direccion,
            identificationCard: value.cedula,
            departament: {
              departamentId: value.departamento.departamentoId,
              description: value.departamento.departamento,
              countryId: value.departamento.paisId,
            },
            isActive: value.isActivo
          }
        ];
      });
    } else throw new Error('An array was expected');
    return data;
  }

}
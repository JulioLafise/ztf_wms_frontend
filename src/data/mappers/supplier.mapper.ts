import { SupplierEntity } from '@wms/entities';
import { Validator } from '@wms/helpers';

export class SupplierMapper {
  constructor() {}

  static getItem(values: unknown): SupplierEntity {
    let data: SupplierEntity = {};
    if (!Validator.isObjectEmpty(values as any)){
      const value: any = values;
      data = {
        supplierId: value.proveedorId,
        code: value.codigo,
        firstName: value.nombre,
        lastName: value.apellido,
        cellphone: value.celular,
        email: value.email,
        address: value.direccion,
        departament: {
          departamentId: value.departamentoId
        },
        isActive: value.isActivo
      };
    } else throw new Error('An object was expected');
    return data;
  }

  static getList(values: unknown): SupplierEntity[] {
    let data: SupplierEntity[] = [];
    if (Array.isArray(values)){
      values.forEach(value => {
        data = [
          ...data,
          {
            supplierId: value.proveedorId,
            code: value.codigo,
            firstName: value.nombre,
            lastName: value.apellido,
            cellphone: value.celular,
            email: value.email,
            address: value.direccion,
            departament: {
              departamentId: value.departamento.departamentoId,
              description: value.departamento.descripcion,
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
import { WarehouseEntity } from '@wms/entities';
import { Validator } from '@wms/helpers';

export class WarehouseMapper {
  constructor() {}

  static getItem(values: unknown): WarehouseEntity {
    let data: WarehouseEntity = {};
    if (!Validator.isObjectEmpty(values as any)){
      const value: any = values;
      data = {
        warehouseId: value.modeloId,
        description: value.descripcion,
        isActive: value.isActivo,
        departament: {
          departamentId: value.departamentoId, 
        }
      };
    } else throw new Error('An object was expected');
    return data;
  }

  static getList(values: unknown): WarehouseEntity[] {
    let data: WarehouseEntity[] = [];
    if (Array.isArray(values)){
      values.forEach(value => {
        data = [
          ...data,
          {
            warehouseId: value.bodegaId,
            description: value.descripcion,
            isActive: value.isActivo,
            departament: {
              departamentId: value.departamento.departamentoId,
              description: value.departamento.descripcion,
              countryId: value.departamento.paisId
            }
          }
        ];
      });
    } else throw new Error('An array was expected');
    return data;
  }

}
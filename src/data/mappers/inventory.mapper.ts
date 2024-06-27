import { InventoryEntity } from '@wms/entities';
import { Validator } from '@wms/helpers';

export class InventoryMapper {
  constructor() {}

  static getItem(values: unknown): InventoryEntity {
    let data: InventoryEntity = {};
    if (!Validator.isObjectEmpty(values as any)){
      const value: any = values;
      data = {
        inventoryId: value.inventarioId,
        description: value.descripcion,
        quanty: value.cantidad,
        code: value.codigo,
        category: value.categoria,
        model: value.modelo,
        brand: value.marca,
        unitMeasure: value.unidadMedida
      };
    } else throw new Error('An object was expected');
    return data;
  }

  static getList(values: unknown): InventoryEntity[] {
    let data: InventoryEntity[] = [];
    if (Array.isArray(values)){
      values.forEach(value => {
        data = [
          ...data,
          {
            inventoryId: value.inventarioId,
            description: value.descripcion,
            quanty: value.cantidad,
            code: value.codigo,
            category: value.categoria,
            model: value.modelo,
            brand: value.marca,
            unitMeasure: value.unidadMedida
          }
        ];
      });
    } else throw new Error('An array was expected');
    return data;
  }

}
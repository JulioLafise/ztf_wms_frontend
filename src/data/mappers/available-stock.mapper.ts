import { AvailableStockEntity } from '@wms/entities';
import { Validator } from '@wms/helpers';

export class AvailableStockMapper {
  constructor() {}

  static getItem(values: unknown): AvailableStockEntity {
    let data: AvailableStockEntity = {};
    if (!Validator.isObjectEmpty(values as any)){
      const value: any = values;
      data = {
        inventoryId: value.inventarioId,
        batchCode: value.codigo_lote,
        serieNumber: value.numero_serie,
        status: value.estado,
        product: value.producto,
        category: value.categoria,
        isEcommerce: value.isEcommerce
      };
    } else throw new Error('An object was expected');
    return data;
  }

  static getList(values: unknown): AvailableStockEntity[] {
    let data: AvailableStockEntity[] = [];
    if (Array.isArray(values)){
      values.forEach(value => {
        data = [
          ...data,
          {
            inventoryId: value.inventarioId,
            batchCode: value.codigo_lote,
            serieNumber: value.numero_serie,
            status: value.estado,
            product: value.producto,
            category: value.categoria,
            isEcommerce: value.isEcommerce
          }
        ];
      });
    } else throw new Error('An array was expected');
    return data;
  }

}
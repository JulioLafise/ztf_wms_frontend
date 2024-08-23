import { InventoryDepartureEntity } from '@wms/entities';
import { Validator } from '@wms/helpers';

export class InventoryDepartureMapper {
  constructor() {}

  static getList(values: unknown): InventoryDepartureEntity[] {
    let data: InventoryDepartureEntity[] = [];
    if (Array.isArray(values)){
      values.forEach(value => {
        data = [
          ...data,
          {
            inventoryId: value.inventarioId,
            product: {
              productId: value.productoId,
              name: value.producto
            },
            serie: value.numeroSerie,
            ticket: value.numeroTicket
          }
        ];
      });
    } else throw new Error('An array was expected');
    return data;
  }

}
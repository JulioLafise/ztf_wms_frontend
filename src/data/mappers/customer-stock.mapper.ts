import { CustomerStockEntity } from '@wms/entities';
import { Validator } from '@wms/helpers';

export class CustomerStockMapper {
  constructor() {}

  static getItem(values: unknown): CustomerStockEntity {
    let data: CustomerStockEntity = {};
    if (!Validator.isObjectEmpty(values as any)){
      const value: any = values;
      data = {
        inventoryId: value.inventario_id || 0,
        batchCode: value.codigo_lote || '',
        serieNumber: value.numero_serie || '',
        status: value.estado || '',
        product: value.producto || '',
        customerUuid: value.clienteId || '',
        identificationCard: value.cedula,
        email: value.email,
        firstName: value.firtname,
        lastName: value.lastname,
        cellphone: value.phone,
        address: value.address,
        accountStatus: value.estadoCuenta,
        accountCreatedAt: value.fechaCreaCuenta,
        isActive: value.isActivo,
        isLock: value.isBloqueado,
        accountAngaza: value.cuentaAngaza
      };
    } else throw new Error('An object was expected');
    return data;
  }

  static getList(values: unknown): CustomerStockEntity[] {
    let data: CustomerStockEntity[] = [];
    if (Array.isArray(values)) {
      values.forEach(value => {
        data = [
          ...data,
          {
            inventoryId: value.inventario_id || 0,
            batchCode: value.codigo_lote || '',
            serieNumber: value.numero_serie || '',
            status: value.estado || '',
            product: value.producto || '',
            customerUuid: value.clienteId || '',
            identificationCard: value.cedula,
            email: value.email,
            firstName: value.firtname,
            lastName: value.lastname,
            cellphone: value.phone,
            address: value.address,
            accountStatus: value.estadoCuenta,
            accountCreatedAt: value.fechaCreaCuenta,
            isActive: value.isActivo,
            isLock: value.isBloqueado,
            accountAngaza: value.cuentaAngaza
          }
        ];
      });
    } else throw new Error('An array was expected');
    return data;
  }

}
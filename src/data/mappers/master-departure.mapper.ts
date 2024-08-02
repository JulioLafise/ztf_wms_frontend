import { MasterDepartureEntity, DetailDepartureEntity } from '@wms/entities';
import { Validator } from '@wms/helpers';
import moment from 'moment';

export class MasterDepartureMapper {
  constructor() {}

  static getItem(values: unknown): MasterDepartureEntity {
    let data: MasterDepartureEntity = {};
    if (!Validator.isObjectEmpty(values as any)){
      const value: any = values;
      data = {
        masterDepartureId: value.maestroSalidaId,
        description: value.descripcion,
        code: value.codigo,
        typeCurrency: value.tipoMoneda,
        purchaseOrderCode: value.codigoPedido,
        employee: {
          employeeId: value.empleadoEntrega.empleadoId,
          firstName: value.empleadoEntrega.empleadoEntrega
        },
        customer: {
          customerUuid: value.clienteId,
          firstName: value.cliente,
          identificationCard: value.cedula
        },
        departureType: {
          departureTypeId: value.tipoSalida.tipoSalidaId,
          description: value.tipoSalida.descripcion,
        },
        createdAt: moment(value.fecha).toDate(),
        isEcommerce: value.isEcommerce,
        isFinish: value.isFinalizado,
        isActive: value.isActivo,
        details: this.getDetailEntryList(value.salidaDetalle),
      };
    } else throw new Error('An object was expected');
    return data;
  }

  static getList(values: unknown): MasterDepartureEntity[] {
    let data: MasterDepartureEntity[] = [];
    if (Array.isArray(values)){
      values.forEach(value => {
        data = [
          ...data,
          {
            masterDepartureId: value.maestroSalidaId,
            description: value.descripcion,
            code: value.codigo,
            typeCurrency: value.tipoMoneda,
            purchaseOrderCode: value.codigoPedido,
            employee: {
              employeeId: value.empleadoEntrega.empleadoId,
              firstName: value.empleadoEntrega.empleadoEntrega
            },
            customer: {
              customerUuid: value.clienteId,
              firstName: value.cliente,
              identificationCard: value.cedula
            },
            departureType: {
              departureTypeId: value.tipoSalida.tipoSalidaId,
              description: value.tipoSalida.descripcion,
            },
            createdAt: moment(value.fecha).toDate(),
            isEcommerce: value.isEcommerce,
            isFinish: value.isFinalizado,
            isActive: value.isActivo,
          }
        ];
      });
    } else throw new Error('An array was expected');
    return data;
  }

  private static getDetailEntryList(values: unknown): DetailDepartureEntity[] {
    let data: DetailDepartureEntity[] = [];
    const value: any = values;
    if (Array.isArray(value)) {
      value.forEach((item: any) => {
        data = [
          ...data,
          {
            detailDepartureId: item.salidaDetalleId,
            description: item.descripcion,
            lot: item.codigoLote,
            quanty: item.cantidad,
            price: item.precio,
            serie: item.numeroSerie,
            product: {
              description: item.producto
            },
            productStatus: {
              productStatusId: item.estadoProducto.estadoProductoId,
              description: item.estadoProducto.descripcion
            }
          }
        ];
      });
    } else throw new Error('An array was expected');
    return data;
  }

}
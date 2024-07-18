import { MasterPurchaseOrderEntity, DetailPurchaseOrderEntity } from '@wms/entities';
import { Validator } from '@wms/helpers';

export class MasterPurchaseOrderMapper {
  constructor() {}

  static getItem(values: unknown): MasterPurchaseOrderEntity {
    let data: MasterPurchaseOrderEntity = {};
    if (!Validator.isObjectEmpty(values as any)){
      const value: any = values;
      data = {
        masterPurchaseOrderId: value.maestroPedidoId,
        code: value.codigo,
        description: value.descripcion,
        date: value.fecha, 
        identificationCard: value.cedula,
        phone: value.phone,
        address: value.address,
        customer: {
          customerId: value.clienteId
        },     
        email: value.email,
        firstName: value.firtName,
        lastName: value.lastName,
        paymentMethod: value.metodoPago,
        typeCurrency: {
          typeCurrencyId: value.tipoMoneda.tipoMonedaId,
          description: value.tipoMoneda.tipoMoneda,
          iconName: value.tipoMoneda.icon
        },
        details: this.getDetailEntryList(value.listEntradaDetalle),
        status: value.estadoPedido,
        isActive: value.isActivo,
      };
    } else throw new Error('An object was expected');
    return data;
  }

  static getList(values: unknown): MasterPurchaseOrderEntity[] {
    let data: MasterPurchaseOrderEntity[] = [];
    if (Array.isArray(values)){
      values.forEach(value => {
        data = [
          ...data,
          {
            masterPurchaseOrderId: value.maestroPedidoId,
            code: value.codigo,
            description: value.descripcion,
            date: value.fecha,
            identificationCard: value.cedula,
            phone: value.phone,
            status: value.estadoPedido,
            address: value.address,
            paymentMethod: value.metodoPago,
            customer: {
              customerUuid: value.clienteId,
            },
            email: value.email,
            firstName: value.firtname,
            lastName: value.lastname,
            productName: value.producto,
            productId: value.productoId,
            priceGroupId: value.grupoPrecioAngazaId,
            pay: value.pago,
            price: value.precio,
            isActive: value.isActivo,
          }
        ];
      });
    } else throw new Error('An array was expected');
    return data;
  }

  private static getDetailEntryList(values: unknown): DetailPurchaseOrderEntity[] {
    let data: DetailPurchaseOrderEntity[] = [];
    const value: any = values;
    if (Array.isArray(value)) {
      value.forEach((item: any) => {
        data = [
          ...data,
          {
            // detailPurchaseOrderId: item.entradaDetalleId,
            description: item.descripcion,
            price: item.precio,
            quanty: item.cantidad,
            productName: item.nameProducto,
            image: item.img,
            color: item.color,
            dimension: item.dimension,
            subtotal: item.subTotal,
            product: {
              productId: item.producto.productoId,
              description: item.producto.descripcion,
              code: item.producto.codigo
            },
            priceGroup: {
              billingType: item.grupoPrecio.tipoFacturacion,
              initialPayment: item.grupoPrecio.pagoInicial,
              gracePeriodDays: item.grupoPrecio.periodoGraciaDias,
              monthlyPayment: item.grupoPrecio.pagoMensual,
              paymentDayInterval: item.grupoPrecio.intervaloPagoDia,
              total: item.grupoPrecio.precioTotal,
              name: item.grupoPrecio.nombre,
              description: item.grupoPrecio.descripcion,
            }
          }
        ];
      });
    } else throw new Error('An array was expected');
    return data;
  }

}
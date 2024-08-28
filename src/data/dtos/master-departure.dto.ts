import * as Yup from 'yup';

const schemaPOST: Yup.ObjectSchema<MasterDepartureDTO> = Yup.object().shape({
  maestroSalidaId: Yup.number(),
  descripcion: Yup.string().notRequired(),
  codigo: Yup.string().required(),
  tipoMonedaId: Yup.number().required(),
  maestroPedidoId: Yup.number().required(),
  empleadoEntregaId: Yup.number().required(),
  tipoSalidaId: Yup.number().required(),
  clienteId: Yup.number().required(),
  isEcommerce: Yup.boolean(),
  isFinalizado: Yup.boolean().default(false),
  listaDetalle: Yup.array<DetailDeparture>().required(),
  isActivo: Yup.boolean().default(true),
});

const schemaPATCH: Yup.ObjectSchema<MasterDepartureDTO> = Yup.object().shape({
  maestroSalidaId: Yup.number().required(),
  descripcion: Yup.string(),
  codigo: Yup.string(),
  tipoMonedaId: Yup.number(),
  clienteId: Yup.number(),
  maestroPedidoId: Yup.number(),
  empleadoEntregaId: Yup.number(),
  tipoSalidaId: Yup.number(),
  isEcommerce: Yup.boolean(),
  isFinalizado: Yup.boolean(),
  listaDetalle: Yup.array<DetailDeparture>(),
  isActivo: Yup.boolean().default(true)
});

type DetailDeparture = {
  salidaDetalleId?: number,
  descripcion?: string,
  cantidad?: number,
  codigoLote?: string,
  numeroSerie?: string,
  precio?: number,
  inventarioId?: number,
  maestroSalidaId?: number,
  estadoProductoId?: number,
  productoId?: number
};

export class MasterDepartureDTO {

  public maestroSalidaId?: number;

  public descripcion?: string;

  public codigo?: string;

  public tipoMonedaId?: number;

  public clienteId?: number;

  public maestroPedidoId?: number;

  public empleadoEntregaId?: number;

  public tipoSalidaId?: number;
  
  public listaDetalle?: Array<DetailDeparture>;
  
  public isFinalizado?: boolean;

  public isActivo?: boolean;

  public isEcommerce?: boolean;

  static async created(data: { [key: string]: any }): Promise<[any?, MasterDepartureDTO?]>
  {
    try {
      const dto = new MasterDepartureDTO();

      dto.maestroSalidaId = data.masterDepartureId || 0;
      dto.descripcion = data.description;
      dto.codigo = data.code;
      dto.tipoMonedaId = data.typeCurrency ? data.typeCurrency.typeCurrencyId : data.typeCurrencyId;
      dto.clienteId = data.customer ? data.customer.customerId : data.customerId;
      dto.empleadoEntregaId = data.employee ? data.employee.employeeId : data.employeeId;
      dto.isFinalizado = data.isFinish;
      dto.maestroPedidoId = data.purchaseOrder ? data.purchaseOrder.masterPurchaseOrderId : data.masterPurchaseOrderId;
      dto.tipoSalidaId = data.departureType ? data.departureType.departureTypeId : data.departureTypeId;
      let details: DetailDeparture[] = [];
      if (Array.isArray(data.details)) {
        data.details.forEach(value => {
          details = [
            ...details,
            {
              salidaDetalleId: value.detailDepartureId,
              descripcion: value.description,
              cantidad: value.quanty,
              precio: value.price,
              codigoLote: value.lot,
              numeroSerie: value.serie,
              inventarioId: value.inventoryId,
              maestroSalidaId: value.masterDepartureId,
              estadoProductoId: value.productStatus ? value.productStatus.productStatusId : value.productStatusId,
              productoId: value.product ? value.product.productId : value.productId,
            }
          ];
        });
      }
      dto.listaDetalle = details;
      dto.isEcommerce = false;
      dto.isFinalizado = false;
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

  static async updated(data: { [key: string]: any }): Promise<[any?, MasterDepartureDTO?]>
  {
    try {
      const dto = new MasterDepartureDTO();

      dto.maestroSalidaId = data.masterDepartureId || 0;
      dto.descripcion = data.description;
      dto.codigo = data.code;
      dto.tipoMonedaId = data.typeCurrency ? data.typeCurrency.typeCurrencyId : data.typeCurrencyId;
      dto.clienteId = data.customer ? data.customer.customerId : data.customerId;
      dto.empleadoEntregaId = data.employee ? data.employee.employeeId : data.employeeId;
      dto.isFinalizado = data.isFinish;
      dto.maestroPedidoId = data.purchaseOrder ? data.purchaseOrder.masterPurchaseOrderId : data.masterPurchaseOrderId;
      dto.tipoSalidaId = data.departureType ? data.departureType.departureTypeId : data.departureTypeId;
      let details: DetailDeparture[] = [];
      if (Array.isArray(data.details)) {
        data.details.forEach(value => {
          details = [
            ...details,
            {
              salidaDetalleId: value.isNew ? 0 : value.detailDepartureId,
              descripcion: value.description,
              cantidad: value.quanty,
              precio: value.price,
              codigoLote: value.lot,
              numeroSerie: value.serie,
              inventarioId: value.inventoryId,
              maestroSalidaId: value.isNew ? 0 : value.masterDepartureId,
              estadoProductoId: value.productStatus ? value.productStatus.productStatusId : value.productStatusId,
              productoId: value.product ? value.product.productId : value.productId,
            }
          ];
        });
      }
      dto.listaDetalle = details;
      dto.isEcommerce = false;
      dto.isFinalizado = false;
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

  static async get(data: { [key: string]: any }): Promise<[any?, MasterDepartureDTO?]>
  {
    try {
      const dto = new MasterDepartureDTO();

      dto.maestroSalidaId = data.masterDepartureId;
      
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
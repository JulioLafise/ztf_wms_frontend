import * as Yup from 'yup';

const schemaPOST: Yup.ObjectSchema<MasterPurchaseOrderDTO> = Yup.object().shape({
  maestroPedidoId: Yup.number(),
  firtName: Yup.string().required(),
  lastName: Yup.string().required(),
  phone: Yup.string().required(),
  cedula: Yup.string().required(),
  clienteCognitoId: Yup.string().required(),
  email: Yup.string().required(),
  descripcion: Yup.string().required(),
  address: Yup.string().required(),
  codigoPago: Yup.string().required(),
  proveedorPago: Yup.string().required(),
  tipoMonedaId: Yup.number().required(),
  listaDetalle: Yup.array<DetailPurchaseOrder>().required(),
  isActivo: Yup.boolean().default(true)
});

const schemaPATCH: Yup.ObjectSchema<MasterPurchaseOrderDTO> = Yup.object().shape({
  maestroPedidoId: Yup.number().required(),
  firtName: Yup.string(),
  lastName: Yup.string(),
  phone: Yup.string(),
  cedula: Yup.string(),
  clienteCognitoId: Yup.string(),
  email: Yup.string(),
  descripcion: Yup.string(),
  address: Yup.string(),
  codigoPago: Yup.string(),
  proveedorPago: Yup.string(),
  tipoMonedaId: Yup.number(),
  listaDetalle: Yup.array<DetailPurchaseOrder>(),
  isActivo: Yup.boolean().default(true)
});

type DetailPurchaseOrder = {
  pedidoDetalleId?: number,
  nameProducto?: string,
  descripcion?: string,
  dimension?: string,
  color?: string,
  img?: string,
  precio?: number,
  cantidad?: number,
  pago?: number,
  productoId?: number,
  grupoPrecioId?: number,
};

export class MasterPurchaseOrderDTO {

  public maestroPedidoId?: number;

  public firtName?: string;

  public lastName?: string;

  public phone?: string;

  public cedula?: string;

  public clienteCognitoId?: string;

  public email?: string;

  public descripcion?: string;

  public address?: string;

  public codigoPago?: string;

  public proveedorPago?: string;

  public tipoMonedaId?: number;

  public listaDetalle?: Array<DetailPurchaseOrder>;

  public isActivo?: boolean;

  static async created(data: { [key: string]: any }): Promise<[any?, MasterPurchaseOrderDTO?]>
  {
    try {
      const dto = new MasterPurchaseOrderDTO();

      dto.maestroPedidoId = data.masterPurchaseOrderId || 0;
      dto.firtName = data.firstName;
      dto.lastName = data.lastName;
      dto.phone = data.phone;
      dto.cedula = data.identificationCard;
      dto.clienteCognitoId = data.customerCognitoId;
      dto.email = data.email;
      dto.descripcion = data.description;
      dto.address = data.address;
      dto.codigoPago = data.codePO;
      dto.proveedorPago = data.supplierPO;
      dto.tipoMonedaId = data.typeCurrency ? data.typeCurrency.typeCurrencyId : data.typeCurrencyId;
      let details: DetailPurchaseOrder[] = [];
      if (Array.isArray(data.details)) {
        data.details.forEach(value => {
          details = [
            ...details,
            {
              pedidoDetalleId: value.detailPurchaseOrderId,
              nameProducto: value.productName,
              descripcion: value.description,
              dimension: value.dimension,
              color: value.color,
              img: value.image,
              precio: value.prices,
              cantidad: value.quanty,
              pago: value.payment,
              productoId: value.product ? value.product.productId : value.productId,
              grupoPrecioId: value.product ? value.priceGroup.priceGroupId : value.priceGroupIdvalue.priceGroupId
            }
          ];
        });
      }
      dto.listaDetalle = details;
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

  static async updated(data: { [key: string]: any }): Promise<[any?, MasterPurchaseOrderDTO?]>
  {
    try {
      const dto = new MasterPurchaseOrderDTO();

      dto.maestroPedidoId = data.masterPurchaseOrderId || 0;
      dto.firtName = data.firstName;
      dto.lastName = data.lastName;
      dto.phone = data.phone;
      dto.cedula = data.identificationCard;
      dto.clienteCognitoId = data.customerCognitoId;
      dto.email = data.email;
      dto.descripcion = data.description;
      dto.address = data.address;
      dto.codigoPago = data.codePO;
      dto.proveedorPago = data.supplierPO;
      dto.tipoMonedaId = data.typeCurrency ? data.typeCurrency.typeCurrencyId : data.typeCurrencyId;
      let details: DetailPurchaseOrder[] = [];
      if (Array.isArray(data.details)) {
        data.details.forEach(value => {
          details = [
            ...details,
            {
              pedidoDetalleId: value.detailPurchaseOrderId,
              nameProducto: value.productName,
              descripcion: value.description,
              dimension: value.dimension,
              color: value.color,
              img: value.image,
              precio: value.prices,
              cantidad: value.quanty,
              pago: value.payment,
              productoId: value.product ? value.product.productId : value.productId,
              grupoPrecioId: value.product ? value.priceGroup.priceGroupId : value.priceGroupId
            }
          ];
        });
      }
      dto.listaDetalle = details;
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

  static async get(data: { [key: string]: any }): Promise<[any?, MasterPurchaseOrderDTO?]>
  {
    try {
      const dto = new MasterPurchaseOrderDTO();

      dto.maestroPedidoId = data.masterPurchaseOrderId;
      
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
import * as Yup from 'yup';

const schemaPOST: Yup.ObjectSchema<MasterDepartureDTO> = Yup.object().shape({
  maestroSalidaId: Yup.number(),
  descripcion: Yup.string().required(),
  codigo: Yup.string().required(),
  tipoMonedaId: Yup.number().required(),
  clienteId: Yup.number().required(),
  isTipoSalida: Yup.boolean().default(true),
  isFinalizado: Yup.boolean().default(true),
  listaDetalle: Yup.array<DetailDeparture>().required(),
  isActivo: Yup.boolean().default(true),
});

const schemaPATCH: Yup.ObjectSchema<MasterDepartureDTO> = Yup.object().shape({
  maestroSalidaId: Yup.number().required(),
  descripcion: Yup.string(),
  codigo: Yup.string(),
  tipoMonedaId: Yup.number(),
  clienteId: Yup.number(),
  isTipoSalida: Yup.boolean(),
  isFinalizado: Yup.boolean(),
  listaDetalle: Yup.array<DetailDeparture>(),
  isActivo: Yup.boolean().default(true)
});

type DetailDeparture = {
  salidaDetalleId?: number,
  nameProducto?: string,
  descripcion?: string,
  dimension?: string,
  color?: string,
  img?: string,
  cantidad?: number,
  precio?: number,
  pago?: number,
  maestroSalidaId?: number,
  productoId?: number,
  grupoPrecioId?: number,
};

export class MasterDepartureDTO {

  public maestroSalidaId?: number;

  public descripcion?: string;

  public codigo?: string;

  public tipoMonedaId?: number;

  public clienteId?: number;

  public isFinalizado?: boolean;

  public isTipoSalida?: boolean;

  public listaDetalle?: Array<DetailDeparture>;

  public isActivo?: boolean;

  static async created(data: { [key: string]: any }): Promise<[any?, MasterDepartureDTO?]>
  {
    try {
      const dto = new MasterDepartureDTO();

      dto.maestroSalidaId = data.masterDepartureId || 0;
      dto.descripcion = data.description;
      dto.codigo = data.code;
      dto.tipoMonedaId = data.typeCurrency ? data.typeCurrency.typeCurrencyId : data.typeCurrencyId;
      dto.clienteId = data.customer ? data.customer.customerId : data.customerId;
      dto.isFinalizado = data.isFinish;
      dto.isTipoSalida = data.isOutputType;
      let details: DetailDeparture[] = [];
      if (Array.isArray(data.details)) {
        data.details.forEach(value => {
          details = [
            ...details,
            {
              salidaDetalleId: value.detailDepartureId,
              descripcion: value.description,
              nameProducto: value.producto,
              dimension: value.dimension,
              color: value.color,
              img: value.img,
              cantidad: value.quanty,
              precio: value.price,
              pago: value.pay,
              maestroSalidaId: value.masterDpartureId,
              productoId: value.product ? value.product.productId : value.productId,
              grupoPrecioId: value.groupPrice ? value.groupPrice.groupPriceId : value.groupPriceId,
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

  static async updated(data: { [key: string]: any }): Promise<[any?, MasterDepartureDTO?]>
  {
    try {
      const dto = new MasterDepartureDTO();

      dto.maestroSalidaId = data.masterDepartureId || 0;
      dto.descripcion = data.description;
      dto.codigo = data.code;
      dto.tipoMonedaId = data.typeCurrency ? data.typeCurrency.typeCurrencyId : data.typeCurrencyId;
      dto.clienteId = data.customer ? data.customer.customerId : data.customerId;
      dto.isFinalizado = data.isFinish;
      dto.isTipoSalida = data.isOutputType;
      let details: DetailDeparture[] = [];
      if (Array.isArray(data.details)) {
        data.details.forEach(value => {
          details = [
            ...details,
            {
              salidaDetalleId: value.detailDepartureId,
              descripcion: value.description,
              nameProducto: value.producto,
              dimension: value.dimension,
              color: value.color,
              img: value.img,
              cantidad: value.quanty,
              precio: value.price,
              pago: value.pay,
              maestroSalidaId: value.masterDpartureId,
              productoId: value.product ? value.product.productId : value.productId,
              grupoPrecioId: value.groupPrice ? value.groupPrice.groupPriceId : value.groupPriceId,
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
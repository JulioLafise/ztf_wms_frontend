import * as Yup from 'yup';

const schemaPOST: Yup.ObjectSchema<MasterEntryDTO> = Yup.object().shape({
  maestroEntradaId: Yup.number(),
  descripcion: Yup.string().notRequired(),
  personaEntrega: Yup.string().required(),
  tipoMonedaId: Yup.number().required(),
  empleadoRecibeId: Yup.number().required(),
  categoriaId: Yup.number().required(),
  proveedorId: Yup.number().required(),
  departamentoId: Yup.number().required(),
  bodegaId: Yup.number().required(),
  tipoEntradaId: Yup.number().required(),
  listaDetalle: Yup.array<DetailEntry>().required(),
  isActivo: Yup.boolean().default(true)
});

const schemaPATCH: Yup.ObjectSchema<MasterEntryDTO> = Yup.object().shape({
  maestroEntradaId: Yup.number().required(),
  descripcion: Yup.string(),
  personaEntrega: Yup.string(),
  tipoMonedaId: Yup.number(),
  empleadoRecibeId: Yup.number(),
  categoriaId: Yup.number(),
  proveedorId: Yup.number(),
  departamentoId: Yup.number(),
  bodegaId: Yup.number(),
  tipoEntradaId: Yup.number(),
  listaDetalle: Yup.array<DetailEntry>(),
  isActivo: Yup.boolean().default(true)
});

type DetailEntry = {
  entradaDetalleId?: number,
  descripcion?: string,
  cantidad?: number,
  codigoLote?: string,
  numeroSerie?: string,
  precio?: number,
  maestroentradaId?: number,
  estadoProductoId?: number,
  productoId?: number
};

export class MasterEntryDTO {

  public maestroEntradaId?: number;

  public descripcion?: string;

  public personaEntrega?: string;

  public tipoMonedaId?: number;

  public empleadoRecibeId?: number;

  public categoriaId?: number;

  public proveedorId?: number;

  public departamentoId?: number;

  public bodegaId?: number;

  public tipoEntradaId?: number;

  public listaDetalle?: Array<DetailEntry>;

  public isActivo?: boolean;

  static async created(data: { [key: string]: any }): Promise<[any?, MasterEntryDTO?]>
  {
    try {
      const dto = new MasterEntryDTO();

      dto.maestroEntradaId = data.masterEntryId || 0;
      dto.descripcion = data.description;
      dto.personaEntrega = data.delivery;
      dto.tipoMonedaId = data.typeCurrency ? data.typeCurrency.typeCurrencyId : data.typeCurrencyId;
      dto.categoriaId = data.category ? data.category.categoryId : data.categoryId;
      dto.empleadoRecibeId = data.employee ? data.employee.employeeId : data.employeeId;
      dto.proveedorId = data.supplier ? data.supplier.supplierId : data.supplierId;
      dto.departamentoId = data.departament ? data.departament.departamentId : data.departamentId;
      dto.bodegaId = data.warehouse ? data.warehouse.warehouseId : data.warehouseId;
      dto.tipoEntradaId = data.entryType ? data.entryType.entryTypeId : data.entryTypeId;
      let details: any[] = [];
      if (Array.isArray(data.details)) {
        data.details.forEach(value => {
          details = [
            ...details,
            {
              entradaDetalleId: value.detailEntryId,
              descripcion: value.description,
              cantidad: value.quanty,
              codigoLote: value.lot,
              numeroSerie: value.serie,
              precio: value.price,
              maestroentradaId: value.masterEntryId,
              estadoProductoId: value.productStatus ? value.productStatus.productStatusId : value.productStatusId,
              productoId: value.product ? value.product.productId : value.productId,
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

  static async updated(data: { [key: string]: any }): Promise<[any?, MasterEntryDTO?]>
  {
    try {
      const dto = new MasterEntryDTO();

      dto.maestroEntradaId = data.masterEntryId;
      dto.descripcion = data.description;
      dto.personaEntrega = data.delivery;
      dto.tipoMonedaId = data.typeCurrency ? data.typeCurrency.typeCurrencyId : data.typeCurrencyId;
      dto.categoriaId = data.category ? data.category.categoryId : data.categoryId;
      dto.empleadoRecibeId = data.employee ? data.employee.employeeId : data.employeeId;
      dto.proveedorId = data.supplier ? data.supplier.supplierId : data.supplierId;
      dto.departamentoId = data.departament ? data.departament.departamentId : data.departamentId;
      dto.bodegaId = data.warehouse ? data.warehouse.warehouseId : data.warehouseId;
      dto.tipoEntradaId = data.entryType ? data.entryType.entryTypeId : data.entryTypeId;
      let details: any[] = [];
      if (Array.isArray(data.details)) {
        data.details.forEach(value => {
          details = [
            ...details,
            {
              entradaDetalleId: value.detailEntryId,
              descripcion: value.description,
              cantidad: value.quanty,
              codigoLote: value.lot,
              numeroSerie: value.serie,
              precio: value.price,
              maestroentradaId: value.masterEntryId,
              estadoProductoId: value.productStatus ? value.productStatus.productStatusId : value.productStatusId,
              productoId: value.product ? value.product.productId : value.productId,
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

  static async get(data: { [key: string]: any }): Promise<[any?, MasterEntryDTO?]>
  {
    try {
      const dto = new MasterEntryDTO();

      dto.maestroEntradaId = data.masterEntryId;
      
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
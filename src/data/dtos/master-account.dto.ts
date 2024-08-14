import * as Yup from 'yup';

const schemaPOST: Yup.ObjectSchema<MasterAccountDTO> = Yup.object().shape({
  maestroPedidoId: Yup.number().required(),
  inventarioId: Yup.number().required(),
  maestroCuentaId: Yup.number().required(),
  productoId: Yup.number().required(),
  unitNumber: Yup.string().required(),
  grupoPrecioId: Yup.string().required(),
  clienteId: Yup.string().required(),
  pago: Yup.number().required(),
});

const schemaPATCH: Yup.ObjectSchema<MasterAccountDTO> = Yup.object().shape({
  maestroPedidoId: Yup.number().required(),
  inventarioId: Yup.number(),
  maestroCuentaId: Yup.number(),
  productoId: Yup.number(),
  unitNumber: Yup.string(),
  grupoPrecioId: Yup.string(),
  clienteId: Yup.string(),
  pago: Yup.number(),
});


export class MasterAccountDTO {

  public maestroPedidoId?: number;

  public inventarioId?: number;

  public maestroCuentaId?: number;

  public productoId?: number;

  public unitNumber?: string;

  public clienteId?: string;

  public grupoPrecioId?: string;

  public pago?: number;

  static async created(data: { [key: string]: any }): Promise<[any?, MasterAccountDTO?]>
  {
    try {
      const dto = new MasterAccountDTO();

      dto.maestroPedidoId = data.masterPurchaseOrderId;
      dto.maestroCuentaId = data.masterAccountId;
      dto.productoId = data.productId;
      dto.inventarioId = data.inventoryId;
      dto.unitNumber = data.unitNumber;
      dto.clienteId = data.customerId;
      dto.grupoPrecioId = data.priceGroupId;
      dto.pago = data.pay;

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

  static async updated(data: { [key: string]: any }): Promise<[any?, MasterAccountDTO?]>
  {
    try {
      const dto = new MasterAccountDTO();

      dto.maestroPedidoId = data.masterPurchaseOrderId;
      dto.unitNumber = data.unitNumber;
      dto.clienteId = data.customerId;
      dto.grupoPrecioId = data.priceGroupId;
      dto.pago = data.pay;

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

  static async get(data: { [key: string]: any }): Promise<[any?, MasterAccountDTO?]>
  {
    try {
      const dto = new MasterAccountDTO();

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
import * as Yup from 'yup';

const schemaPOST: Yup.ObjectSchema<ProductStatusDTO> = Yup.object().shape({
  estadoProductoId: Yup.number(),
  descripcion: Yup.string().required(),
  isActivo: Yup.boolean()
});

const schemaPATCH: Yup.ObjectSchema<ProductStatusDTO> = Yup.object().shape({
  estadoProductoId: Yup.number().required(),
  descripcion: Yup.string(),
  isActivo: Yup.boolean()
});


export class ProductStatusDTO {

  public estadoProductoId?: number;

  public descripcion?: string;

  public isActivo?: boolean;

  static async created(data: { [key: string]: any }): Promise<[any?, ProductStatusDTO?]>
  {
    try {
      const dto = new ProductStatusDTO();

      dto.estadoProductoId = data.productStatusId || 0;
      dto.descripcion = data.description;
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

  static async updated(data: { [key: string]: any }): Promise<[any?, ProductStatusDTO?]>
  {
    try {
      const dto = new ProductStatusDTO();

      dto.estadoProductoId = data.productStatusId;
      dto.descripcion = data.description;
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

}
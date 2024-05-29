import * as Yup from 'yup';

const schemaPOST: Yup.ObjectSchema<BrandDTO> = Yup.object().shape({
  marcaId: Yup.number(),
  descripcion: Yup.string().required(),
  isActivo: Yup.boolean()
});

const schemaPATCH: Yup.ObjectSchema<BrandDTO> = Yup.object().shape({
  marcaId: Yup.number().required(),
  descripcion: Yup.string(),
  isActivo: Yup.boolean()
});


export class BrandDTO {

  public marcaId?: number;

  public descripcion?: string;

  public isActivo?: boolean;

  static async created(data: { [key: string]: any }): Promise<[any?, BrandDTO?]>
  {
    try {
      const dto = new BrandDTO();

      dto.marcaId = data.brandId || 0;
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

  static async updated(data: { [key: string]: any }): Promise<[any?, BrandDTO?]>
  {
    try {
      const dto = new BrandDTO();

      dto.marcaId = data.brandId;
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
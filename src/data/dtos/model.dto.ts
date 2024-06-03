import * as Yup from 'yup';

const schemaPOST: Yup.ObjectSchema<ModelDTO> = Yup.object().shape({
  modeloId: Yup.number(),
  descripcion: Yup.string().required(),
  marcaId: Yup.number().required(),
  isActivo: Yup.boolean()
});

const schemaPATCH: Yup.ObjectSchema<ModelDTO> = Yup.object().shape({
  modeloId: Yup.number().required(),
  descripcion: Yup.string(),
  marcaId: Yup.number(),
  isActivo: Yup.boolean()
});


export class ModelDTO {

  public modeloId?: number;

  public descripcion?: string;

  public marcaId?: number;

  public isActivo?: boolean;

  static async created(data: { [key: string]: any }): Promise<[any?, ModelDTO?]>
  {
    try {
      const dto = new ModelDTO();

      dto.modeloId = data.modelId || 0;
      dto.descripcion = data.description;
      dto.marcaId = data.brand ? data.brand.brandId : data.brandId;
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

  static async updated(data: { [key: string]: any }): Promise<[any?, ModelDTO?]>
  {
    try {
      const dto = new ModelDTO();

      dto.modeloId = data.modelId;
      dto.descripcion = data.description;
      dto.marcaId = data.brand ? data.brand.brandId : data.brandId;
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
import * as Yup from 'yup';

const schemaPOST: Yup.ObjectSchema<CategoryDTO> = Yup.object().shape({
  categoriaId: Yup.number(),
  descripcion: Yup.string().required(),
  isActivo: Yup.boolean()
});

const schemaPATCH: Yup.ObjectSchema<CategoryDTO> = Yup.object().shape({
  categoriaId: Yup.number().required(),
  descripcion: Yup.string(),
  isActivo: Yup.boolean()
});

export class CategoryDTO {

  public categoriaId?: number;

  public descripcion?: string;

  public isActivo?: boolean;

  static async created(data: { [key: string]: any }): Promise<[any?, CategoryDTO?]>
  {
    try {
      const dto = new CategoryDTO();

      dto.categoriaId = data.categoryId || 0;
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

  static async updated(data: { [key: string]: any }): Promise<[any?, CategoryDTO?]>
  {
    try {
      const dto = new CategoryDTO();

      dto.categoriaId = data.categoryId;
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

  static async get(data: { [key: string]: any }): Promise<[any?, CategoryDTO?]> 
  {
    try {
      const dto = new CategoryDTO();

      dto.categoriaId = data.categoryId;

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
import * as Yup from 'yup';

const schemaPOST: Yup.ObjectSchema<ColorDTO> = Yup.object().shape({
  tipoColorId: Yup.number(),
  colorRgb: Yup.string().required(),
  isActivo: Yup.boolean()
});

const schemaPATCH: Yup.ObjectSchema<ColorDTO> = Yup.object().shape({
  tipoColorId: Yup.number().required(),
  colorRgb: Yup.string(),
  isActivo: Yup.boolean()
});


export class ColorDTO {

  public tipoColorId?: number;

  public colorRgb?: string;

  public isActivo?: boolean;

  static async created(data: { [key: string]: any }): Promise<[any?, ColorDTO?]>
  {
    try {
      const dto = new ColorDTO();

      dto.tipoColorId = data.colorId || 0;
      dto.colorRgb = data.color;
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

  static async updated(data: { [key: string]: any }): Promise<[any?, ColorDTO?]>
  {
    try {
      const dto = new ColorDTO();

      dto.tipoColorId = data.colorId || 0;
      dto.colorRgb = data.color;
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
import * as Yup from 'yup';

const schemaPOST: Yup.ObjectSchema<FeaturesDTO> = Yup.object().shape({
  catalogoCaracteristicaId: Yup.number(),
  descripcion: Yup.string().required(),
  isActivo: Yup.boolean()
});

const schemaPATCH: Yup.ObjectSchema<FeaturesDTO> = Yup.object().shape({
  catalogoCaracteristicaId: Yup.number().required(),
  descripcion: Yup.string(),
  isActivo: Yup.boolean()
});


export class FeaturesDTO {

  public catalogoCaracteristicaId?: number;

  public descripcion?: string;

  public isActivo?: boolean;

  static async created(data: { [key: string]: any }): Promise<[any?, FeaturesDTO?]>
  {
    try {
      const dto = new FeaturesDTO();

      dto.catalogoCaracteristicaId = data.featuresId || 0;
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

  static async updated(data: { [key: string]: any }): Promise<[any?, FeaturesDTO?]>
  {
    try {
      const dto = new FeaturesDTO();

      dto.catalogoCaracteristicaId = data.featuresId;
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
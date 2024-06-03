import * as Yup from 'yup';

const schemaPOST: Yup.ObjectSchema<TypeCurrencyDTO> = Yup.object().shape({
  tipoMonedaId: Yup.number(),
  descripcion: Yup.string().required(),
  iconName: Yup.string().required(),
  isActivo: Yup.boolean()
});

const schemaPATCH: Yup.ObjectSchema<TypeCurrencyDTO> = Yup.object().shape({
  tipoMonedaId: Yup.number().required(),
  descripcion: Yup.string(),
  iconName: Yup.string(),
  isActivo: Yup.boolean()
});


export class TypeCurrencyDTO {

  public tipoMonedaId?: number;

  public descripcion?: string;

  public iconName?: string;

  public isActivo?: boolean;

  static async created(data: { [key: string]: any }): Promise<[any?, TypeCurrencyDTO?]>
  {
    try {
      const dto = new TypeCurrencyDTO();

      dto.tipoMonedaId = data.typeCurrencyId || 0;
      dto.descripcion = data.description;
      dto.iconName = data.iconName;
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

  static async updated(data: { [key: string]: any }): Promise<[any?, TypeCurrencyDTO?]>
  {
    try {
      const dto = new TypeCurrencyDTO();

      dto.tipoMonedaId = data.typeCurrencyId;
      dto.descripcion = data.description;
      dto.iconName = data.iconName;
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
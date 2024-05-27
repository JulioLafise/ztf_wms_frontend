import * as Yup from 'yup';

const schemaPOST: Yup.ObjectSchema<UnitMeasureDTO> = Yup.object().shape({
  unidadMedidaId: Yup.number(),
  descripcion: Yup.string().required(),
  abreviacion: Yup.string().required(),
  isActivo: Yup.boolean()
});

const schemaPATCH: Yup.ObjectSchema<UnitMeasureDTO> = Yup.object().shape({
  unidadMedidaId: Yup.number().required(),
  descripcion: Yup.string(),
  abreviacion: Yup.string(),
  isActivo: Yup.boolean()
});


export class UnitMeasureDTO {

  public unidadMedidaId?: number;

  public descripcion?: string;

  public abreviacion?: string;

  public isActivo?: boolean;

  static async created(data: { [key: string]: any }): Promise<[any?, UnitMeasureDTO?]>
  {
    try {
      const dto = new UnitMeasureDTO();

      dto.unidadMedidaId = data.unitMeasureId || 0;
      dto.descripcion = data.description;
      dto.abreviacion = data.abbreviation;
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

  static async updated(data: { [key: string]: any }): Promise<[any?, UnitMeasureDTO?]>
  {
    try {
      const dto = new UnitMeasureDTO();

      dto.unidadMedidaId = data.unitMeasureId;
      dto.descripcion = data.description;
      dto.abreviacion = data.abbreviation;
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
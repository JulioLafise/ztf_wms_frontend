import * as Yup from 'yup';

const schemaPOST: Yup.ObjectSchema<EntryTypeDTO> = Yup.object().shape({
  tipoEntradaId: Yup.number(),
  descripcion: Yup.string().required(),
  isActivo: Yup.boolean()
});

const schemaPATCH: Yup.ObjectSchema<EntryTypeDTO> = Yup.object().shape({
  tipoEntradaId: Yup.number().required(),
  descripcion: Yup.string(),
  isActivo: Yup.boolean()
});


export class EntryTypeDTO {

  public tipoEntradaId?: number;

  public descripcion?: string;

  public isActivo?: boolean;

  static async created(data: { [key: string]: any }): Promise<[any?, EntryTypeDTO?]>
  {
    try {
      const dto = new EntryTypeDTO();

      dto.tipoEntradaId = data.entryTypeId || 0;
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

  static async updated(data: { [key: string]: any }): Promise<[any?, EntryTypeDTO?]>
  {
    try {
      const dto = new EntryTypeDTO();

      dto.tipoEntradaId = data.entryTypeId;
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
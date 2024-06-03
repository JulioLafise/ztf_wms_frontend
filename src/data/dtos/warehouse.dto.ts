import * as Yup from 'yup';

const schemaPOST: Yup.ObjectSchema<WarehouseDTO> = Yup.object().shape({
  bodegaId: Yup.number(),
  descripcion: Yup.string().required(),
  departamentoId: Yup.number().required(),
  isActivo: Yup.boolean()
});

const schemaPATCH: Yup.ObjectSchema<WarehouseDTO> = Yup.object().shape({
  bodegaId: Yup.number().required(),
  descripcion: Yup.string(),
  departamentoId: Yup.number(),
  isActivo: Yup.boolean()
});


export class WarehouseDTO {

  public bodegaId?: number;

  public descripcion?: string;

  public departamentoId?: number;

  public isActivo?: boolean;

  static async created(data: { [key: string]: any }): Promise<[any?, WarehouseDTO?]>
  {
    try {
      const dto = new WarehouseDTO();

      dto.bodegaId = data.warehouseId || 0;
      dto.descripcion = data.description;
      dto.departamentoId = data.departament ? data.departament.departamentId : data.departamentId;
      dto.isActivo = data.isActive;

      await schemaPOST.validate(dto, { abortEarly: false });

      return [
        undefined,
        dto
      ];
    } catch (error) {
      if (error instanceof Yup.ValidationError)
        return [error.errors];
      throw new Error('Unknown error');
    }
  }

  static async updated(data: { [key: string]: any }): Promise<[any?, WarehouseDTO?]>
  {
    try {
      const dto = new WarehouseDTO();

      dto.bodegaId = data.warehouseId;
      dto.descripcion = data.description;
      dto.departamentoId = data.departament ? data.departament.departamentId : data.departamentId;
      dto.isActivo = data.isActive;

      await schemaPATCH.validate(dto, { abortEarly: false });

      return [
        undefined,
        dto
      ];
    } catch (error) {
      if (error instanceof Yup.ValidationError)
        return [error.errors];
      throw new Error('Unknown error');
    }
  }

}
import * as Yup from 'yup';

const schemaPOST: Yup.ObjectSchema<KitDTO> = Yup.object().shape({
  catalogokitId: Yup.number(),
  descripcion: Yup.string().required(),
  categoriaId: Yup.number().required(),
  listKitDetalle: Yup.array<KitDetail>().required(),
  isActivo: Yup.boolean().default(true)
});

const schemaPATCH: Yup.ObjectSchema<KitDTO> = Yup.object().shape({
  catalogokitId: Yup.number().required(),
  descripcion: Yup.string(),
  categoriaId: Yup.number(),
  listKitDetalle: Yup.array<KitDetail>(),
  isActivo: Yup.boolean().default(true)
});

type KitDetail = {
  kitDetalleId?: number,
  descripcion?: string,
  catalogokitId?: number,
  catalogoCaracteristicasId?: number,
  isActivo?: boolean
};

export class KitDTO {

  public catalogokitId?: number;

  public descripcion?: string;

  public categoriaId?: number;

  public listKitDetalle?: Array<KitDetail>;

  public isActivo?: boolean;

  static async created(data: { [key: string]: any }): Promise<[any?, KitDTO?]>
  {
    try {
      const dto = new KitDTO();

      dto.catalogokitId = data.kitId || 0;
      dto.descripcion = data.description;
      dto.categoriaId = data.category ? data.category.categoryId : data.categoryId;
      let details: any[] = [];
      if (Array.isArray(data.details)) {
        data.details.forEach(value => {
          details = [
            ...details,
            {
              kitDetalleId: value.kitDetailId,
              descripcion: value.description,
              catalogokitId: value.kitId,
              catalogoCaracteristicasId: value.feature ? value.feature.featureId : value.featureId,
              isActivo: value.isActive
            }
          ];
        });
      }
      dto.listKitDetalle = details;
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

  static async updated(data: { [key: string]: any }): Promise<[any?, KitDTO?]>
  {
    try {
      const dto = new KitDTO();

      dto.catalogokitId = data.kitId || 0;
      dto.descripcion = data.description;
      dto.categoriaId = data.category ? data.category.categoryId : data.categoryId;
      let details: any[] = [];
      if (Array.isArray(data.details)) {
        data.details.forEach(value => {
          details = [
            ...details,
            {
              kitDetalleId: value.kitDetailId,
              descripcion: value.description,
              catalogokitId: value.kitId,
              catalogoCaracteristicasId: value.feature ? value.feature.featureId : value.featureId,
              isActivo: value.isActive
            }
          ];
        });
      }
      dto.listKitDetalle = details;
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

  static async get(data: { [key: string]: any }): Promise<[any?, KitDTO?]>
  {
    try {
      const dto = new KitDTO();

      dto.catalogokitId = data.kitId;
      
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
import { KitEntity, KitDetailEntity } from '@wms/entities';
import { Validator } from '@wms/helpers';

export class KitMapper {
  constructor() {}

  static getItem(values: unknown): KitEntity {
    let data: KitEntity = {};
    if (!Validator.isObjectEmpty(values as any)){
      const value: any = values;
      data = {
        kitId: value.catalogoKitId,
        description: value.descripcion,
        category: {
          categoryId: value.categoria.categoriaId,
          description: value.categoria.descripcion
        },
        details: this.getDetailEntryList(value.listKitDetalle),
        isActive: value.isActivo,
      };
    } else throw new Error('An object was expected');
    return data;
  }

  static getList(values: unknown): KitEntity[] {
    let data: KitEntity[] = [];
    if (Array.isArray(values)){
      values.forEach(value => {
        data = [
          ...data,
          {
            kitId: value.catalogoKitId,
            description: value.descripcion,
            category: {
              categoryId: value.categoria.categoriId,
              description: value.categoria.descripcion
            },
            isActive: value.isActivo,
          }
        ];
      });
    } else throw new Error('An array was expected');
    return data;
  }

  static getListByCategory(values: unknown): KitEntity[] {
    let data: KitEntity[] = [];
    if (Array.isArray(values)) {
      values.forEach(value => {
        data = [
          ...data,
          {
            kitId: value.catalogoKitId,
            description: value.descripcion,
            category: {
              categoryId: value.categoria.categoriId,
              description: value.categoria.descripcion
            },
            details: this.getDetailEntryList(value.listKitDetalle),
            isActive: value.isActivo,
          }
        ];
      });
    } else throw new Error('An array was expected');
    return data;
  }

  private static getDetailEntryList(values: unknown): KitDetailEntity[] {
    let data: KitDetailEntity[] = [];
    const value: any = values;
    if (Array.isArray(value)) {
      value.forEach((item: any) => {
        data = [
          ...data,
          {
            kitDetailId: item.kitDetalleId,
            description: item.descripcion,
            kitId: item.catalogoKitId,
            kitName: item.caracteristicaDetalle.kit,
            feature: {
              featuresId: item.caracteristicaDetalle.catalogoCaracteristicaId,
              description: item.caracteristicaDetalle.catalogoCaracteristica,
            },
            isActive: item.isActivo
          }
        ];
      });
    } else throw new Error('An array was expected');
    return data;
  }

}
import { CategoryEntity } from '@wms/entities';
import { Validator } from '@wms/helpers';

export class CategoryMapper {
  constructor() {}

  static getItem(values: unknown): CategoryEntity {
    let data: CategoryEntity = {};
    if (!Validator.isObjectEmpty(values as any)){
      const value: any = values;
      data = {
        categoryId: value.categoriaId,
        description: value.descripcion,
        isActive: value.isActivo
      };
    } else throw new Error('An object was expected');
    return data;
  }

  static getList(values: unknown): CategoryEntity[] {
    let data: CategoryEntity[] = [];
    if (Array.isArray(values)){
      values.forEach(value => {
        data = [
          ...data,
          {
            categoryId: value.categoriaId,
            description: value.descripcion,
            isActive: value.isActivo
          }
        ];
      });
    } else throw new Error('An array was expected');
    return data;
  }

}
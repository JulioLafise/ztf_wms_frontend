import { EntryTypeEntity } from '@wms/entities';
import { Validator } from '@wms/helpers';

export class EntryTypeMapper {
  constructor() {}

  static getItem(values: unknown): EntryTypeEntity {
    let data: EntryTypeEntity = {};
    if (!Validator.isObjectEmpty(values as any)){
      const value: any = values;
      data = {
        entryTypeId: value.marcaId,
        description: value.descripcion,
        isActive: value.isActivo
      };
    } else throw new Error('An object was expected');
    return data;
  }

  static getList(values: unknown): EntryTypeEntity[] {
    let data: EntryTypeEntity[] = [];
    if (Array.isArray(values)){
      values.forEach(value => {
        data = [
          ...data,
          {
            entryTypeId: value.marcaId,
            description: value.descripcion,
            isActive: value.isActivo
          }
        ];
      });
    } else throw new Error('An array was expected');
    return data;
  }

}
import { ColorEntity } from '@wms/entities';
import { Validator } from '@wms/helpers';

export class ColorMapper {
  constructor() {}

  static getItem(values: unknown): ColorEntity {
    let data: ColorEntity = {};
    if (!Validator.isObjectEmpty(values as any)){
      const value: any = values;
      data = {
        colorId: value.tipoColorId,
        color: value.codigoRgb,
        isActive: value.isActivo
      };
    } else throw new Error('An object was expected');
    return data;
  }

  static getList(values: unknown): ColorEntity[] {
    let data: ColorEntity[] = [];
    if (Array.isArray(values)){
      values.forEach(value => {
        data = [
          ...data,
          {
            colorId: value.tipoColorId,
            color: value.codigoRgb,
            isActive: value.isActivo
          }
        ];
      });
    } else throw new Error('An array was expected');
    return data;
  }

}
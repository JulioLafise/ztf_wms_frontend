import { TypeCurrencyEntity } from '@wms/entities';
import { Validator } from '@wms/helpers';

export class TypeCurrencyMapper {
  constructor() {}

  static getItem(values: unknown): TypeCurrencyEntity {
    let data: TypeCurrencyEntity = {};
    if (!Validator.isObjectEmpty(values as any)) {
      const value: any = values;
      data = {
        typeCurrencyId: value.tipoMonedaId,
        description: value.descripcion,
        iconName: value.iconName,
        isActive: value.isActivo
      };
    } else throw new Error('An object was expected');
    return data;
  }

  static getList(values: unknown): TypeCurrencyEntity[] {
    let data: TypeCurrencyEntity[] = [];
    if (Array.isArray(values)){
      values.forEach(value => {
        data = [
          ...data,
          {
            typeCurrencyId: value.tipoMonedaId,
            description: value.descripcion,
            iconName: value.iconName,
            isActive: value.isActivo
          }
        ];
      });
    } else throw new Error('An array was expected');
    return data;
  }

}
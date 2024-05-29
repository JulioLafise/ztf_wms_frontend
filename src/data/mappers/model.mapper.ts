import { ModelEntity } from '@wms/entities';
import { Validator } from '@wms/helpers';

export class ModelMapper {
  constructor() {}

  static getItem(values: unknown): ModelEntity {
    let data: ModelEntity = {};
    if (!Validator.isObjectEmpty(values as any)){
      const value: any = values;
      data = {
        modelId: value.modeloId,
        description: value.descripcion,
        isActive: value.isActivo,
        brand: {
          brandId: value.marcaId, 
        }
      };
    } else throw new Error('An object was expected');
    return data;
  }

  static getList(values: unknown): ModelEntity[] {
    let data: ModelEntity[] = [];
    if (Array.isArray(values)){
      values.forEach(value => {
        data = [
          ...data,
          {
            modelId: value.modeloId,
            description: value.descripcion,
            isActive: value.isActivo,
            brand: {              
              brandId: value.marca.marcaId,
              description: value.marca.descripcion 
            }
          }
        ];
      });
    } else throw new Error('An array was expected');
    return data;
  }

}
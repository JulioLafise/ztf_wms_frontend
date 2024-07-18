import { ProductEntity, ProductImageEntity, ProductDetailEntity, ProductColorEntity, ProductDimensionEntity } from '@wms/entities';
import { Validator } from '@wms/helpers';

export class ProductMapper {
  constructor() {}

  static getItem(values: unknown): ProductEntity {
    let data: ProductEntity = {};
    if (!Validator.isObjectEmpty(values as any)){
      const value: any = values;
      data = {
        code: value.codigo,
        productId: value.productoId,
        description: value.descripcion,
        minimum: value.stockMinimo,
        name: value.nombre,
        category: {
          categoryId: value.categoria.categoriaId,
          description: value.categoria.categoria,
        },
        unitMeasure: {
          unitMeasureId: value.unidadMedida.unidadMedidaId,
          description: value.unidadMedida.unidadMedida,          
        },
        model: {
          modelId: value.modelo.modeloId,
          description: value.modelo.modelo,
          brand: {
            brandId: value.modelo.marcaId,
            description: value.modelo.marca
          }
        },   
        colors: this.getColorsList(value.listColor),
        dimensions: this.getDimensionsList(value.listDimension),
        images: this.getImagesList(value.listImagen),
        details: this.getDetailsList(value.listDetalle),
        isEcommerce: value.isEcommerce,
        isActive: value.isActivo
      };
    } else throw new Error('An object was expected');
    return data;
  }

  static getList(values: unknown): ProductEntity[] {
    let data: ProductEntity[] = [];
    if (Array.isArray(values)){
      values.forEach(value => {
        data = [
          ...data,
          {
            code: value.codigo,
            productId: value.productoId,
            description: value.descripcion,
            minimum: value.stockMinimo,
            name: value.nombre,
            isEcommerce: value.isEcommerce,
            category: {
              description: value.categoria,
            },
            unitMeasure: {
              description: value.unidadMedida,
            },
            model: {
              description: value.modelo,
              brand: {
                description: value.marca
              }
            },          
            isActive: value.isActivo
          }
        ];
      });
    } else throw new Error('An array was expected');    
    return data;
  }

  static getColorsList(values: unknown): ProductColorEntity[] {
    let data: ProductColorEntity[] = [];
    const value: any = values;
    if (Array.isArray(value)) {
      value.forEach((item: any) => {
        data = [
          ...data,
          {
            productColorId: item.productoColorId,
            colorId: item.tipoColorId,
            color: item.codigoRgb
          }
        ];
      });
    } /*else throw new Error('An array was expected');*/
    return data;
  }

  static getDimensionsList(values: unknown): ProductDimensionEntity[] {
    let data: ProductDimensionEntity[] = [];
    const value: any = values;
    if (Array.isArray(value)) {
      value.forEach((item: any) => {
        data = [
          ...data,
          {
            dimensionId: item.productoDimensionId,
            unitMeasure: {
              unitMeasureId: item.unidadMedidaId,
              description: item.unidadMedida
            },
            description: item.descripcion,
          }
        ];
      });
    } /*else throw new Error('An array was expected');*/
    return data;
  }

  static getImagesList(values: unknown): ProductImageEntity[] {
    let data: ProductImageEntity[] = [];
    const value: any = values;
    if (Array.isArray(value)) {
      value.forEach((item: any) => {
        data = [
          ...data,
          {
            productImageId: item.productoImagenId,
            url: item.imagenUrl,
          }
        ];
      });
    } /*else throw new Error('An array was expected');*/
    return data;
  }

  static getDetailsList(values: unknown): ProductDetailEntity[] {
    let data: ProductDetailEntity[] = [];
    const value: any = values;
    if (Array.isArray(value)) {
      value.forEach((item: any) => {
        data = [
          ...data,
          {
            productDetailId: item.productoDetalleId,
            description: item.descripcion,
            productId: item.productoId,
            featureId: item.caracteristicaDetalleId,
            isActive: item.isActivo
          }
        ];
      });
    } /*else throw new Error('An array was expected');*/
    return data;
  }

}
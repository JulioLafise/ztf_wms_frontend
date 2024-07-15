import * as Yup from 'yup';

const schemaPOST: Yup.ObjectSchema<ProductDTO> = Yup.object().shape({
  productoId: Yup.number(),
  descripcion: Yup.string().required(),
  nombre: Yup.string().required(),
  modeloId: Yup.number().required(),
  stockMinimo: Yup.number().required(),
  categoriaId: Yup.number().required(),
  unidadMedidaId: Yup.number().required(),
  listColor: Yup.array<ProductColor>().required(),
  listDimension: Yup.array<ProductDimension>().required(),
  listImagen: Yup.array<ProductImage>().required(),
  listDetalle: Yup.array<ProductDetail>().required(),
  isActivo: Yup.boolean()
});

const schemaPATCH: Yup.ObjectSchema<ProductDTO> = Yup.object().shape({
  productoId: Yup.number().required(),
  descripcion: Yup.string(),
  nombre: Yup.string(),
  modeloId: Yup.number(),
  stockMinimo: Yup.number(),
  categoriaId: Yup.number(),
  unidadMedidaId: Yup.number(),
  listColor: Yup.array<ProductColor>().required(),
  listDimension: Yup.array<ProductDimension>().required(),
  listImagen: Yup.array<ProductImage>().required(),
  listDetalle: Yup.array<ProductDetail>().required(),
  isActivo: Yup.boolean()
});

type ProductColor = { tipoColorId?: number  };

type ProductDimension = { unidadMedidaId?: number, descripcion?: string  };

type ProductImage = {
  productoImagenId?: number,
  imagenUrl?: string,
  productoId?: number
};

type ProductDetail = {
  productoDetalleId?: number,
  descripcion?: string,
  productoId?: number,
  caracteristicaDetalleId?: number,
  isActivo?: boolean
};

export class ProductDTO {

  public productoId?: number;

  public descripcion?: string;

  public nombre?: string;

  public modeloId?: number;

  public stockMinimo?: number;

  public categoriaId?: number;

  public unidadMedidaId?: number;

  public listColor?: Array<ProductColor>;

  public listDimension?: Array<ProductDimension>;

  public listImagen?: Array<ProductImage>;

  public listDetalle?: Array<ProductDetail>;

  public isActivo?: boolean;

  static async created(data: { [key: string]: any }): Promise<[any?, ProductDTO?]>
  {
    try {
      const dto = new ProductDTO();

      dto.productoId = data.productId || 0;
      dto.descripcion = data.description;
      dto.nombre = data.name;
      dto.stockMinimo = data.minimum;
      dto.modeloId = data.model ? data.model.modelId : data.modelId;
      dto.categoriaId = data.category ? data.category.categoryId : data.categoryId;
      dto.unidadMedidaId = data.unitMeasure ? data.unitMeasure.unitMeasureId : data.unitMeasureId;
      let colors: any[] = [];
      if (Array.isArray(data.colors)) {
        data.colors.forEach(value => {
          colors = [
            ...colors,
            {
              tipoColorId: value.colorId,
            }
          ];
        });
      }
      dto.listColor = colors;
      let dimensions: any[] = [];
      if (Array.isArray(data.dimensions)) {
        data.dimensions.forEach(value => {
          dimensions = [
            ...dimensions,
            {
              unidadMedidaId: value.unitMeasure.unitMeasureId,
              descripcion: value.description,
            }
          ];
        });
      }
      dto.listDimension = dimensions;
      let images: any[] = [];
      if (Array.isArray(data.images)) {
        data.images.forEach(value => {
          images = [
            ...images,
            {
              productoImagenId: value.productImageId,
              imagenUrl: value.url,
              prductoId: value.productId
            }
          ];
        });
      }
      dto.listImagen = images;
      let details: any[] = [];
      if (Array.isArray(data.details)) {
        data.details.forEach(value => {
          details = [
            ...details,
            {
              productoDetalleId: value.productDetailId,
              descripcion: value.description,
              productoId: value.productId,
              caracteristicaDetalleId: value.featureId,
              isActivo: value.isActive
            }
          ];
        });
      }
      dto.listDetalle = details;
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

  static async updated(data: { [key: string]: any }): Promise<[any?, ProductDTO?]>
  {
    try {
      const dto = new ProductDTO();

      dto.productoId = data.productId;
      dto.descripcion = data.description;
      dto.nombre = data.name;
      dto.stockMinimo = data.minimum;
      dto.modeloId = data.model ? data.model.modelId : data.modelId;
      dto.categoriaId = data.category ? data.category.categoryId : data.categoryId;
      dto.unidadMedidaId = data.unitMeasure ? data.unitMeasure.unitMeasureId : data.unitMeasureId;
      let colors: any[] = [];
      if (Array.isArray(data.colors)) {
        data.colors.forEach(value => {
          colors = [
            ...colors,
            {
              tipoColorId: value.colorId,
            }
          ];
        });
      }
      dto.listColor = colors;
      let dimensions: any[] = [];
      if (Array.isArray(data.dimensions)) {
        data.dimensions.forEach(value => {
          dimensions = [
            ...dimensions,
            {
              unidadMedidaId: value.unitMeasure.unitMeasureId,
              descripcion: value.description,
            }
          ];
        });
      }
      dto.listDimension = dimensions;
      let images: any[] = [];
      if (Array.isArray(data.images)) {
        data.images.forEach(value => {
          images = [
            ...images,
            {
              productoImagenId: value.productImageId,
              imagenUrl: value.url,
              prductoId: value.productId
            }
          ];
        });
      }
      dto.listImagen = images;
      let details: any[] = [];
      if (Array.isArray(data.details)) {
        data.details.forEach(value => {
          details = [
            ...details,
            {
              productoDetalleId: value.productDetailId,
              descripcion: value.description,
              productoId: value.productId,
              caracteristicaDetalleId: value.featureId,
              isActivo: value.isActive
            }
          ];
        });
      }
      dto.listDetalle = details;
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

  static async get(data: { [key: string]: any }): Promise<[any?, ProductDTO?]>
  {
    try {
      const dto = new ProductDTO();

      dto.productoId = data.productId;
      dto.nombre = data.name;

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
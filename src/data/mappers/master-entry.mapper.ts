import { MasterEntryEntity, DetailEntryEntity } from '@wms/entities';
import { Validator } from '@wms/helpers';
import moment from 'moment';

export class MasterEntryMapper {
  constructor() {}

  static getItem(values: unknown): MasterEntryEntity {
    let data: MasterEntryEntity = {};
    if (!Validator.isObjectEmpty(values as any)){
      const value: any = values;
      data = {
        masterEntryId: value.maestroEntradaId,
        code: value.codigo,
        description: value.descripcion,
        createdAt: value.fechaCrea,
        createdBy: value.usuarioCrea,
        warehouse: {
          warehouseId: value.bodega.bodegaId,
          description: value.bodega.bodega
        },
        delivery: value.personaEntrega,
        entryType: {
          entryTypeId: value.tipoEntrada.tipoEntradaId,
          description: value.tipoEntrada.descripcion
        },        
        employee: {
          employeeId: value.empleadoRecibe.empleadoRecibeId,
          firstName: value.empleadoRecibe.nombre,
          lastName: value.empleadoRecibe.apellido
        },
        supplier: {
          supplierId: value.proveedor.clienteId,
          firstName: value.proveedor.nombre,
          lastName: value.proveedor.apellido,
        },
        typeCurrency: {
          typeCurrencyId: value.tipoMoneda.tipoMonedaId,
          description: value.tipoMoneda.descripcion,
        },
        category: {
          categoryId: value.categoria.categoriaId,
          description: value.categoria.descripcion,
        },
        departament: {
          departamentId: value.departamento.departamentoId,
          description: value.departamento.departamento,
          countryId: value.departamento.paisId,

        },
        details: this.getDetailEntryList(value.listEntradaDetalle),
        isFinish: value.isFinalizado,
        isActive: value.isActivo,
      };
    } else throw new Error('An object was expected');
    return data;
  }

  static getList(values: unknown): MasterEntryEntity[] {
    let data: MasterEntryEntity[] = [];
    if (Array.isArray(values)){
      values.forEach(value => {
        data = [
          ...data,
          {
            masterEntryId: value.maestroEntradaId,
            code: value.codigo,
            description: value.descripcion,
            createdAt: moment(value.fechaCrea).toDate(),
            createdBy: value.usuarioCrea,
            entryType: {
              description: value.tipoEntrada
            },
            warehouse: {
              description: value.bodega,
            },            
            employee: {
              firstName: value.nombreRecibe,
              lastName: value.apellidoRecibe
            },
            supplier: {
              firstName: value.nombreProveedor,
              lastName: value.apellidoProveedor,
              email: value.emailProveedor,
              cellphone: value.celularProveedor,
            },
            departament: {
              description: value.departamento,
            },
            isFinish: value.isFinalizado,
            isActive: value.isActivo,
          }
        ];
      });
    } else throw new Error('An array was expected');
    return data;
  }

  private static getDetailEntryList(values: unknown): DetailEntryEntity[] {
    let data: DetailEntryEntity[] = [];
    const value: any = values;
    if (Array.isArray(value)) {
      value.forEach((item: any) => {
        data = [
          ...data,
          {
            detailEntryId: item.entradaDetalleId,
            description: item.descripcion,
            lot: item.codigoLote,
            quanty: item.cantidad,
            price: item.precio,
            serie: item.numeroserie,
            masterEntryId: item.maestroEntradaId,
            product: {
              productId: item.producto.productoId,
              description: item.producto.descripcion,
              code: item.producto.codigo
            },
            productStatus: {
              productStatusId: item.estadoProducto.estadoProductoId,
              description: item.estadoProducto.descripcion
            }
          }
        ];
      });
    } else throw new Error('An array was expected');
    return data;
  }

}
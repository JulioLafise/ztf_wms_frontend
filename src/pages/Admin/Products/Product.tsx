import React from 'react';
import type { MRT_ColumnDef, MRT_TableInstance } from 'material-react-table';
import { Paper } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { IOnSaveAndEditRows, IOptionsQuery } from '@wms/interfaces';
import { useAlertNotification, useUI, useProduct } from '@wms/hooks';
import { MaterialTable, ButtonActions } from '@wms/components';
import { ProductEntity } from '@wms/entities';


const ProductPage = () => {
  const { swalToastError, swalToastWait, swalToastSuccess } = useAlertNotification();
  const { isMobile } = useUI();
  const navigate = useNavigate();
  const [ref, setRef] = React.useState<MRT_TableInstance<ProductEntity>>();
  const [optionsQuery, setOptionsQuery] = React.useState<IOptionsQuery>({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [globalFilter, setGlobalFilter] = React.useState('');
  const { isGenerate, rowCount, useProductListQuery, useProductMutation } = useProduct();
  const { data, isLoading, isError, refetch } = useProductListQuery({ ...pagination, filter: globalFilter });
  const mutation = useProductMutation({ ...pagination, filter: globalFilter }, optionsQuery);

  const columns = React.useMemo<MRT_ColumnDef<ProductEntity>[]>(() => [
    {
      id: 'productId',
      accessorKey: 'productId',
      header: 'Product ID',
      enableEditing: false,
      minSize: 150,
    },
    {
      id: 'name',
      accessorKey: 'name',
      header: 'Nombre',
      minSize: 150,
      editVariant: 'select',
    },
    {
      id: 'description',
      accessorKey: 'description',
      header: 'Descripcion',
      minSize: 150,
      Cell: ({ renderedCellValue }) => <div className="flex h-12 w-96"><p className="text-wrap break-all">{String(renderedCellValue).slice(0,105)}{String(renderedCellValue).length >= 104 ? '...' : ''}</p></div>
    },
    {
      id: 'brand',
      accessorKey: 'brand',
      accessorFn: (row) => row.model?.brand?.description, 
      header: 'Marca',
      minSize: 150,
    },
    {
      id: 'model',
      accessorKey: 'model',
      accessorFn: (row) => row.model?.description, 
      header: 'Modelo',
      minSize: 150,
    },
    {
      id: 'category',
      accessorKey: 'category',
      accessorFn: (row) => row.category?.description, 
      header: 'Categoria',
      minSize: 150,
    },
    {
      id: 'unitMeasure',
      accessorKey: 'unitMeasure',
      accessorFn: (row) => row.unitMeasure?.description, 
      header: 'Unidad de Medida',
      minSize: 150,
    },
    {
      id: 'isActive',
      accessorKey: 'isActive',
      header: 'Activo',
      minSize: 150,
      enableEditing: false,
      editVariant: undefined,
      Cell: ({ renderedCellValue }) => renderedCellValue ? <CheckBox color="primary" /> : <CheckBoxOutlineBlank />,
    },
  ], []);

  const onSaveOrEdit: IOnSaveAndEditRows<ProductEntity> = async (row, table, values, validation): Promise<void> => {
    navigate(`${row.original.productId}/edit`, { replace: false });
  };


  const onChangeState = async (values: { [key: string]: any }) => {
    setOptionsQuery({ typeMutation: 'delete'});
    const title = values.isActive ? 'Desactive Product!' : 'Active Product!';
    swalToastWait(title, {
      message: 'Please wait a few minutes',
      showLoading: true,
    });
    mutation.mutateAsync(values)
      .then(() => {
        swalToastSuccess('Finished', { showConfirmButton: false, timer: 2000 });
      })
      .catch((err) => { swalToastError(err.message, { showConfirmButton: false, timer: 3000 }); });
  };


  return (
    <Paper elevation={4}>
      <MaterialTable<ProductEntity>
        columns={columns}
        data={data || []}
        enableRowActions
        columnsVisible={{ productId: false }}
        setRef={setRef}
        pagination={pagination}
        rowCount={rowCount}
        onPaginationChange={setPagination}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        onActionEdit={onSaveOrEdit}
        onActionSave={onSaveOrEdit}
        isLoading={isLoading}
        onActionStateChange={(row) => onChangeState(row.original)}
        isGenerate={isGenerate}
        isError={isError}        
        onActionRefreshTable={() => refetch()}
               
      />
      <ButtonActions title="New" onClick={() => { navigate('new', { replace: false }); }} ubication={isMobile ? {} : { bottom: 99, right: 99 }} />
    </Paper>
  );
};

export default ProductPage;
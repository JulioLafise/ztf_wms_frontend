import React from 'react';
import type { MRT_ColumnDef, MRT_TableInstance } from 'material-react-table';
import { Paper } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import { IOptionsQuery, IOnSaveAndEditRows } from '@wms/interfaces';
import { useAlertNotification, useSupplier, useUI } from '@wms/hooks';
import { MaterialTable, ButtonActions } from '@wms/components';
import { SupplierEntity } from '@wms/entities';
import SupplierModal from './SupplierModal';

const SupplierPage = () => {
  const { swalToastError, swalToastWait, swalToastSuccess } = useAlertNotification();
  const { isMobile } = useUI();
  const [optionsQuery, setOptionsQuery] = React.useState<IOptionsQuery>({});
  const [isOpen, setIsOpen] = React.useState(false);
  const [edit, setEdit] = React.useState<SupplierEntity | null>(null);
  const [ref, setRef] = React.useState<MRT_TableInstance<SupplierEntity>>();
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [globalFilter, setGlobalFilter] = React.useState('');
  const { isGenerate, rowCount, useSupplierListQuery, useSupplierMutation } = useSupplier();
  const { data, isLoading, isError, refetch } = useSupplierListQuery({ ...pagination, filter: globalFilter });
  const mutation = useSupplierMutation({ ...pagination, filter: globalFilter }, optionsQuery);

  const columns = React.useMemo<MRT_ColumnDef<SupplierEntity>[]>(() => [
    {
      id: 'supplierId',
      accessorKey: 'supplierId',
      header: 'Supplier ID',
      enableEditing: false,
      minSize: 150,
    },
    {
      id: 'code',
      accessorKey: 'code',
      header: 'Codigo',
      minSize: 150,
    },
    {
      id: 'firstName',
      accessorKey: 'firstName',
      header: 'Nombres',
      minSize: 150,
    },
    {
      id: 'lastName',
      accessorKey: 'lastName',
      header: 'Apellidos',
      minSize: 150,
    },
    {
      id: 'cellphone',
      accessorKey: 'cellphone',
      header: 'Telefono',
      minSize: 150,
    },
    {
      id: 'email',
      accessorKey: 'email',
      header: 'Email',
      minSize: 150,
    },
    {
      id: 'departament',
      accessorKey: 'departament',
      accessorFn: (row) => row.departament?.description, 
      header: 'Departamento',
      minSize: 150,
    },
    {
      id: 'address',
      accessorKey: 'address',
      header: 'Direccion',
      minSize: 150,
      Cell: ({ renderedCellValue }) => <div className="flex items-center h-12 w-96"><p className="text-wrap break-all">{String(renderedCellValue).slice(0,105)}{String(renderedCellValue).length >= 104 ? '...' : ''}</p></div>
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

  const onSaveOrEdit: IOnSaveAndEditRows<SupplierEntity> = async (row, table, values, validation): Promise<void> => {
    setEdit(row.original);
    setIsOpen(true);
  };

  const onSubmit = (values: { [x: string]: any }) => {
    setOptionsQuery({
      typeMutation: values.supplierId ? 'put' : 'post'
    });
    onTransaction(values);
  };

  const onTransaction = (values: { [x: string]: any }) => {
    const title = !values.supplierId ? 'Saving Supplier!' : 'Updating Supplier!';
    swalToastWait(title, {
      message: 'Please wait a few minutes',
      showLoading: true,
    });
    mutation.mutateAsync(values)
      .then(() => {
        setIsOpen(false);
        setEdit(null);
        swalToastSuccess('Finished', { showConfirmButton: false, timer: 2000 });
      })
      .catch((err) => { swalToastError(err.message, { showConfirmButton: false, timer: 3000 }); });
  };

  const onChangeState = async (values: { [key: string]: any }) => {
    setOptionsQuery({ typeMutation: 'delete'});
    const title = values.isActive ? 'Desactive Supplier!' : 'Active Supplier!';
    swalToastWait(title, {
      message: 'Please wait a few minutes',
      showLoading: true,
    });
    mutation.mutateAsync(values)
      .then(() => {
        setIsOpen(false);
        setEdit(null);
        swalToastSuccess('Finished', { showConfirmButton: false, timer: 2000 });
      })
      .catch((err) => { swalToastError(err.message, { showConfirmButton: false, timer: 3000 }); });
  };

  return (
    <Paper elevation={4}>
      <MaterialTable<SupplierEntity>
        columns={columns}
        data={data || []}
        enableRowActions
        columnsVisible={{ supplierId: false, }}
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
      <ButtonActions title="New" onClick={() => { setIsOpen(true); setEdit(null); }} ubication={isMobile ? {} : { bottom: 99, right: 99 }} />
      <SupplierModal isOpen={isOpen} setIsOpen={setIsOpen} onSubmit={onSubmit} isLoading={mutation.isPending} edit={edit} />
    </Paper>
  );
};

export default SupplierPage;
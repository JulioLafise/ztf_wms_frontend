import React from 'react';
import type { MRT_ColumnDef, MRT_TableInstance } from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import { Paper, useMediaQuery, Theme } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import moment from 'moment';
import { IOnSaveAndEditRows } from '@wms/interfaces';
import { MasterEntryEntity } from '@wms/entities';
import { useAlertNotification, useMasterEntry } from '@wms/hooks';
import { MaterialTable, ButtonActions } from '@wms/components';

const EntryPage = () => {
  const { swalToastError, swalToastSuccess } = useAlertNotification();
  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down(768));
  const [ref, setRef] = React.useState<MRT_TableInstance<MasterEntryEntity>>();
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [globalFilter, setGlobalFilter] = React.useState('');
  const { isGenerate, useMasterEntryListQuery } = useMasterEntry();
  const { data, isLoading, isError, refetch } = useMasterEntryListQuery({ ...pagination, filter: globalFilter });

  const columns = React.useMemo<MRT_ColumnDef<MasterEntryEntity>[]>(() => [
    {
      id: 'masterEntryId',
      accessorKey: 'masterEntryId',
      header: 'ID',
      enableEditing: false,
      minSize: 150,
    },
    {
      id: 'code',
      accessorKey: 'code',
      header: 'No Entrada',
      minSize: 150,
      enableEditing: false,
    },
    {
      id: 'description',
      accessorKey: 'description',
      header: 'Descripcion',
      minSize: 150,
    },
    {
      id: 'employee',
      accessorKey: 'employee',
      accessorFn: (row) => row.employee?.employeeId,
      header: 'Recibe',
      enableEditing: false,
      minSize: 150,
      Cell: ({ row }) => <p>{row.original.employee?.firstName} {row.original.employee?.lastName}</p>,
    },
    {
      id: 'supplier',
      accessorKey: 'supplier',
      accessorFn: (row) => row.supplier?.supplierId,
      header: 'Proveedor',
      enableEditing: false,
      minSize: 150,
      Cell: ({ row }) => <p>{row.original.supplier?.firstName} {row.original.supplier?.lastName}</p>,
    },
    {
      id: 'warehouse',
      accessorKey: 'warehouse',
      accessorFn: (row) => row.warehouse?.warehouseId,
      header: 'Bodega',
      enableEditing: false,
      minSize: 150,
      Cell: ({ row }) => <p>{row.original.warehouse?.description}</p>,
    },
    {
      id: 'createdBy',
      accessorKey: 'createdBy',
      header: 'Creado Por',
      enableEditing: false,
      minSize: 150,
    },
    {
      id: 'createdAt',
      accessorKey: 'createdAt',
      header: 'Creado',
      enableEditing: false,
      minSize: 150,
      Cell: ({ row }) => <p>{moment(row.original.createdAt).format('YYYY-MM-DD')}</p>,
    },
    {
      id: 'isActive',
      accessorKey: 'isActive',
      header: 'Active',
      minSize: 150,
      editVariant: undefined,
      Cell: ({ renderedCellValue }) => renderedCellValue ? <CheckBox color="primary" /> : <CheckBoxOutlineBlank />,
    },
    {
      id: 'isFinish',
      accessorKey: 'isFinish',
      header: 'Finalizado',
      minSize: 150,
      editVariant: undefined,
      Cell: ({ renderedCellValue }) => renderedCellValue ? <CheckBox color="primary" /> : <CheckBoxOutlineBlank />,
    },
  ], []);

  const onSaveOrEdit: IOnSaveAndEditRows<MasterEntryEntity> = async (row, table, values, validation): Promise<void> => {
    navigate(`${row.original.masterEntryId}/edit`, { replace: false });
  };

  const onStateChange = async (values: { [key: string]: any }) => {
    const data: any = {
      isActive: !values.isActive,
      customerVisitControlId: values.customerVisitControlId
    };
  };

  return (
    <Paper elevation={4}>
      <MaterialTable<MasterEntryEntity>
        columns={columns}
        data={data || []}
        enableRowActions
        columnsVisible={{ masterEntryId: false }}
        setRef={setRef}
        pagination={pagination}
        rowCount={0}
        onPaginationChange={setPagination}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        onActionEdit={onSaveOrEdit}
        onActionSave={onSaveOrEdit}
        onActionRefreshTable={() => refetch()}
        isLoading={isLoading}
        isGenerate={isGenerate}
        isError={isError}     
        onActionStateChange={(row: any) => onStateChange(row.original)}  
      />
      <ButtonActions title="New" onClick={() => { navigate('new', { replace: false }); }} ubication={isMobile ? {} : { bottom: 99, right: 99 }} />
    </Paper>
  );
};

export default EntryPage;
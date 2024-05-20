import React from 'react';
import type { MRT_ColumnDef, MRT_TableInstance } from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import { Paper, useMediaQuery, Theme } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import { IOnSaveAndEditRows } from '@wms/interfaces';
import { useAlertNotification } from '@wms/hooks';
import { MaterialTable, ButtonActions } from '@wms/components';
import moment from 'moment';

const DetailDeparture = () => {
  // const { swalToastError, swalToastSuccess } = useAlertNotification();
  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down(768));
  const [ref, setRef] = React.useState<MRT_TableInstance<any>>();
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [globalFilter, setGlobalFilter] = React.useState('');

  const columns = React.useMemo<MRT_ColumnDef<any>[]>(() => [
    {
      id: 'pedidoDetalleId',
      accessorKey: 'pedidoDetalleId',
      header: 'ID',
      enableEditing: false,
      minSize: 150,
    },
    {
      id: 'descripcion',
      accessorKey: 'descripcion',
      // accessorFn: (row) => `${row.employee?.person?.firstName} ${row.employee?.person?.lastName}`,
      header: 'Descripcion',
      minSize: 150,
      enableEditing: false,
      Cell: ({ row }) => <span>{row.original.employee?.person?.firstName} {row.original.employee?.person?.lastName}</span>
    },
    {
      id: 'precio',
      accessorKey: 'precio',
      header: 'Precio',
      enableEditing: false,
      minSize: 150,
    },
    {
      id: 'producto',
      accessorKey: 'producto',
      header: 'Producto',
      minSize: 150,
      editVariant: 'select'
    },
    {
      id: 'cantidad',
      accessorKey: 'cantidad',
      header: 'Cantidad',
      minSize: 150,
    },
    {
      id: 'estadoProducto',
      accessorKey: 'estadoProducto',
      header: 'Estado',
      minSize: 150,
      editVariant: 'select'
    },
  ], []);

  const onSaveOrEdit: IOnSaveAndEditRows<any> = async (row, table, values, validation): Promise<void> => {
    navigate(`${row.original.customerVisitControlId}/edit`, { replace: false });
  };

  const onStateChange = async (values: { [key: string]: any }) => {
    const data: any = {
      isActive: !values.isActive,
      customerVisitControlId: values.customerVisitControlId
    };
  };

  return (
    <Paper elevation={4}>
      <MaterialTable
        columns={columns}
        data={[]}
        enableRowActions
        isEditing
        columnsVisible={{ pedidoDetalleId: false }}
        setRef={setRef}
        pagination={pagination}
        rowCount={0}
        onPaginationChange={setPagination}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        onActionEdit={onSaveOrEdit}
        onActionSave={onSaveOrEdit}
        // onActionRefreshTable={() => refetch()}
        isLoading={false}
        isGenerate={true}
        isError={false}     
        onActionStateChange={(row: any) => onStateChange(row.original)}  
      />
    </Paper>
  );
};

export default DetailDeparture;
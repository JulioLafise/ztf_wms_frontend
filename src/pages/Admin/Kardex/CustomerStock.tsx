import React from 'react';
import type { MRT_ColumnDef, MRT_TableInstance } from 'material-react-table';
import { Paper } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import { v4 as uuid } from 'uuid';
import { useInventory } from '@wms/hooks';
import { MaterialTable } from '@wms/components';
import { CustomerStockEntity } from '@wms/entities';


const CustomerStockPage = () => {
  const [ref, setRef] = React.useState<MRT_TableInstance<CustomerStockEntity>>();
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [globalFilter, setGlobalFilter] = React.useState('');
  const { customerStock: { rowCount, isGenerate }, useCustomerStockListQuery } = useInventory();
  const { data, isLoading, isError, refetch } = useCustomerStockListQuery({ ...pagination, filter: globalFilter });

  const getStatusColor = (status: boolean) => {
    switch (status) {
      case true:
        return 'bg-red-400';
      case false:
        return 'bg-green-400';
      default:
        return 'bg-red-400';
    }
  };

  const getAccountStatusColor = (status: string) => {
    switch (status) {
      case 'PROCESO DE PAGO':
        return 'bg-blue-500';
      case 'CANCELADO':
        return 'bg-green-500';
      case 'MORA':
        return 'bg-red-500';
      default:
        return 'bg-red-500';
    }
  };

  const columns = React.useMemo<MRT_ColumnDef<CustomerStockEntity>[]>(() => [
    {
      id: 'inventoryId',
      accessorKey: 'inventoryId',
      header: 'Inventory ID',
      enableEditing: false,
      minSize: 150,
    },
    {
      id: 'isLock',
      accessorKey: 'isLock',
      header: 'Estado Equipo',
      minSize: 150,
      Cell: ({ renderedCellValue }) => <div className="flex items-center"><p className={`p-2 ${getStatusColor(Boolean(renderedCellValue))} rounded font-bold`}>{renderedCellValue ? 'DESACTIVADO' : 'ACTIVADO'}</p></div>
    },
    {
      id: 'accountAngaza',
      accessorKey: 'accountAngaza',
      header: 'Cuenta Angaza',
      minSize: 150,
    },
    {
      id: 'accountStatus',
      accessorKey: 'accountStatus',
      header: 'Estado Cuenta',
      minSize: 150,
      Cell: ({ renderedCellValue }) => <div className="flex items-center"><p className={`p-2 ${getAccountStatusColor(String(renderedCellValue))} rounded font-bold`}>{renderedCellValue}</p></div>
    },
    {
      id: 'customerUuid',
      accessorKey: 'customerUuid',
      header: 'Cliente',
      Cell: ({ row }) => <div className="flex h-12 w-96 items-center"><p className="text-wrap break-all">
        ({row.original.identificationCard}) {row.original.firstName} {row.original.lastName} / <b>Email</b>
        : {row.original.email} / <b>Phone</b>: {row.original.cellphone}
      </p></div>
    },
    {
      id: 'address',
      accessorKey: 'address',
      header: 'Direccion',
    },
    {
      id: 'product',
      accessorKey: 'product',
      header: 'Producto',
      minSize: 150,
      Cell: ({ renderedCellValue }) => <div className="flex h-12 w-96 items-center"><p className="text-wrap break-all">{String(renderedCellValue).slice(0,105)}{String(renderedCellValue).length >= 104 ? '...' : ''}</p></div>
    },
    {
      id: 'serieNumber',
      accessorKey: 'serieNumber',
      header: 'Numero Serie',
      minSize: 150,
    },
    {
      id: 'batchCode',
      accessorKey: 'batchCode',
      header: 'Codigo Lote',
      minSize: 150,
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: 'Estado',
      minSize: 150,
    },
    {
      id: 'isActive',
      accessorKey: 'isActive',
      header: 'Activo',
      minSize: 150,
      editVariant: undefined,
      Cell: ({ renderedCellValue }) => renderedCellValue ? <CheckBox color="primary" /> : <CheckBoxOutlineBlank />,
    },
  ], []);

  return (
    <Paper elevation={4}>
      <MaterialTable<CustomerStockEntity>
        columns={columns}
        data={data || []}
        columnsVisible={{ inventoryId: false }}
        setRef={setRef}
        pagination={pagination}
        rowCount={rowCount}
        onPaginationChange={setPagination}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        isLoading={isLoading}
        isGenerate={isGenerate}
        isError={isError}
        onActionRefreshTable={() => refetch()}
      />
    </Paper>
  );
};

export default CustomerStockPage;
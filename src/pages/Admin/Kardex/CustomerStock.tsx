import React from 'react';
import type { MRT_ColumnDef, MRT_TableInstance } from 'material-react-table';
import { Paper } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
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

  const columns = React.useMemo<MRT_ColumnDef<CustomerStockEntity>[]>(() => [
    {
      id: 'inventoryId',
      accessorKey: 'inventoryId',
      header: 'Inventory ID',
      enableEditing: false,
      minSize: 150,
    },
    // {
    //   id: 'customer',
    //   accessorKey: 'customer',
    //   accessorFn: (row) => row.customer.customerUuid, 
    //   header: 'Cliente'
    // },
    {
      id: 'product',
      accessorKey: 'product',
      header: 'Producto',
      minSize: 150,
      Cell: ({ renderedCellValue }) => <div className="flex h-12 w-96"><p className="text-wrap break-all">{String(renderedCellValue).slice(0,105)}{String(renderedCellValue).length >= 104 ? '...' : ''}</p></div>
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
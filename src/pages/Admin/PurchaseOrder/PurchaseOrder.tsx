import React from 'react';
import { type MRT_ColumnDef, type MRT_TableInstance } from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import { Paper, useMediaQuery, Theme, Box, Tooltip, IconButton } from '@mui/material';
import { AssignmentTurnedIn, CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import { IOnSaveAndEditRows } from '@wms/interfaces';
import { MasterPurchaseOrderEntity } from '@wms/entities';
import { useAlertNotification, useMasterPurchaseOrder, useMasterAccount } from '@wms/hooks';
import { MaterialTable, ButtonActions } from '@wms/components';

const PurchaseOrderPage = () => {
  const { swalToastError, swalToastSuccess, swalToastInfo, swalToastWarn, swalToastWait } = useAlertNotification();
  const { isGenerate, useMasterPurchaseOrderListQuery } = useMasterPurchaseOrder();
  const { useMasterAccountMutation } = useMasterAccount();
  const navigate = useNavigate();
  const [ref, setRef] = React.useState<MRT_TableInstance<MasterPurchaseOrderEntity>>();
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [globalFilter, setGlobalFilter] = React.useState('');
  const { data, isLoading, isError, refetch } = useMasterPurchaseOrderListQuery({ ...pagination, filter: globalFilter });
  const mutationAccount = useMasterAccountMutation();

  const getStatusColor = (status: any) => {
    switch (status) {
      case 'EN PROCESO':
        return 'bg-amber-400';
      case 'APROBADO':
        return 'bg-green-400';
      default:
        return 'bg-amber-400';
    }
  };

  const columns = React.useMemo<MRT_ColumnDef<MasterPurchaseOrderEntity>[]>(() => [
    {
      id: 'masterPurchaseOrderId',
      accessorKey: 'masterPurchaseOrderId',
      header: 'ID',
      enableEditing: false,
      minSize: 150,
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: 'Estado Pedido',
      minSize: 150,
      Cell: ({ renderedCellValue }) => <div className="flex items-center"><p className={`p-2 ${getStatusColor(renderedCellValue)} rounded font-bold`}>{renderedCellValue}</p></div>
    },
    {
      id: 'code',
      accessorKey: 'code',
      header: 'No Pedido',
      minSize: 150,
      enableEditing: false,
    },
    // {
    //   id: 'description',
    //   accessorKey: 'description',
    //   header: 'Descripcion',
    //   enableEditing: false,
    //   minSize: 150,
    // },
    {
      id: 'productName',
      accessorKey: 'productName',
      header: 'Producto',
      enableEditing: false,
      minSize: 150,
    },
    {
      id: 'customer',
      accessorKey: 'customer',
      accessorFn: (row) => row.customer?.customerId, 
      header: 'Cliente',
      minSize: 150,
      Cell: ({ row }) => <div className="flex h-12 w-96">
        <p className="text-wrap break-all">
          ({row.original.customer?.identificationCard}) {row.original.customer?.firstName} {row.original.customer?.lastName} 
          , {row.original.customer?.email}, {row.original.customer?.cellphone}, {row.original.customer?.address}
        </p>
      </div>
    },
    {
      id: 'paymentMethod',
      accessorKey: 'paymentMethod',
      header: 'Metodo de Pago',
      enableEditing: false,
      minSize: 150,
    },
    {
      id: 'price',
      accessorKey: 'price',
      header: 'Precio',
      minSize: 150,
      Cell: ({ row }) => <p className="font-bold text-lg">$ {row.original.price}</p>
    },
    {
      id: 'date',
      accessorKey: 'date',
      header: 'Fecha Creacion',
      minSize: 150,
    },
    // {
    //   id: 'isActive',
    //   accessorKey: 'isActive',
    //   header: 'Activo',
    //   minSize: 150,
    //   editVariant: undefined,
    //   Cell: ({ renderedCellValue }) => renderedCellValue ? <CheckBox color="primary" /> : <CheckBoxOutlineBlank />,
    // },
  ], []);

  const onAssign = (row: MasterPurchaseOrderEntity) => {
    if (row.status === 'APROBADO') {
      swalToastWarn('Already Assigned', {
        message: `The code ${row.code} has already been approved`,
        timer: 3000
      });
      return;
    }
    swalToastInfo('Equipment Assignment', {
      message: 'Enter the code provided for the assignment',
      input: 'text',
      inputValue: '',
      showConfirmButton: true,
      confirmButtonText: 'Assign',
      showCancelButton: true,
      cancelButtonText: 'Cancel'
    }).then(resp => {
      if (resp.isConfirmed) {
        swalToastWait('Assigned Purchase Order', {
          message: 'Please wait a few minutes',
          showLoading: true,
        });
        const values = {
          masterPurchaseOrderId: row.masterPurchaseOrderId,
          unitNumber: resp.value,
          customerId: row.customer?.customerUuid,
          priceGroupId: row.priceGroupId,
          pay: row.pay,
          inventoryId: row.inventoryId,
          productId: row.productId,
          masterAccountId: row.masterAccountId
        };
        mutationAccount.mutateAsync(values)
          .then(() => {
            refetch();
            swalToastSuccess('Finished', { showConfirmButton: false, timer: 2000 });
          })
          .catch((err) => { swalToastError(err.message, { showConfirmButton: false, timer: 3000 }); });
      }
    });
  };

  return (
    <Paper elevation={4}>
      <MaterialTable<MasterPurchaseOrderEntity>
        columns={columns}
        data={data || []}
        enableRowActions
        columnsVisible={{ masterPurchaseOrderId: false }}
        setRef={setRef}
        pagination={pagination}
        rowCount={0}
        onPaginationChange={setPagination}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        onActionRefreshTable={() => refetch()}
        isLoading={isLoading}
        isGenerate={isGenerate}
        isError={isError}
        CustomActions={({ row }) => (
          <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Tooltip title="Assign">
              <IconButton
                sx={{
                  padding: 0
                }}
                onClick={() => onAssign(row.original)}
              >
                <AssignmentTurnedIn color="success" />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      />
      {/* <ButtonActions title="New" onClick={() => { navigate('new', { replace: false }); }} ubication={isMobile ? {} : { bottom: 99, right: 99 }} /> */}
    </Paper>
  );
};

export default PurchaseOrderPage;
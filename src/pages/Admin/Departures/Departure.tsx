import React from 'react';
import type { MRT_ColumnDef, MRT_TableInstance } from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import { IconButton, Paper, Tooltip } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank, DoneAll } from '@mui/icons-material';
import moment from 'moment';
import { IOnSaveAndEditRows } from '@wms/interfaces';
import { MasterDepartureEntity } from '@wms/entities';
import { useUI, useMasterDeparture, useAlertNotification } from '@wms/hooks';
import { MaterialTable, ButtonActions } from '@wms/components';

const DeparturePage = () => {
  const { swalToastError, swalToastSuccess, swalToastQuestion, swalToastWait, swalToastInfo } = useAlertNotification();
  const navigate = useNavigate();
  const { isMobile } = useUI();
  const [ref, setRef] = React.useState<MRT_TableInstance<MasterDepartureEntity>>();
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [globalFilter, setGlobalFilter] = React.useState('');
  const { isGenerate, rowCount, useMasterDepartureListQuery, useMasterDepartureFinishMutation } = useMasterDeparture();
  const { data, isError, isLoading, refetch } = useMasterDepartureListQuery({ ...pagination, filter: globalFilter });
  const mutationFinished = useMasterDepartureFinishMutation({ ...pagination, filter: globalFilter });

  const columns = React.useMemo<MRT_ColumnDef<MasterDepartureEntity>[]>(() => [
    {
      id: 'masterDepartureId',
      accessorKey: 'masterDepartureId',
      header: 'ID',
      enableEditing: false,
      minSize: 150,
    },
    {
      id: 'code',
      accessorKey: 'code',
      header: 'No Salida',
      minSize: 150,
      enableEditing: false,
    },
    {
      id: 'customerUuid',
      accessorKey: 'customerUuid',
      accessorFn: (row) => row.customer?.customerUuid, 
      header: 'Cliente',
      enableEditing: false,
      minSize: 150,
      Cell: ({ row }) => <p>{row.original.customer?.firstName}</p>
    },
    {
      id: 'purchaseOrderCode',
      accessorKey: 'purchaseOrderCode',
      header: 'Orden de Pedido',
      minSize: 150,
    },
    {
      id: 'typeCurrencyId',
      accessorKey: 'typeCurrencyId',
      accessorFn: (row) => row.typeCurrency?.typeCurrencyId, 
      header: 'Tipo de Moneda',
      minSize: 150,
      Cell: ({ row }) => <p>{row.original.typeCurrency?.description}</p>
    },
    {
      id: 'departureTypeId',
      accessorKey: 'departureTypeId',
      accessorFn: (row) => row.departureType?.departureTypeId, 
      header: 'Tipo de Salida',
      minSize: 150,
      Cell: ({ row }) => <p>{row.original.departureType?.description}</p>
    },
    {
      id: 'createdAt',
      accessorKey: 'createdAt',
      header: 'Creado',
      minSize: 150,
      Cell: ({ row }) => <p>{moment(row.original.createdAt).format('YYYY-MM-DD')}</p>
    },
    {
      id: 'isFinish',
      accessorKey: 'isFinish',
      header: 'Finalizado',
      minSize: 150,
      editVariant: undefined,
      Cell: ({ renderedCellValue }) => renderedCellValue ? <CheckBox color="primary" /> : <CheckBoxOutlineBlank />,
    },
    {
      id: 'isActive',
      accessorKey: 'isActive',
      header: 'Active',
      minSize: 150,
      editVariant: undefined,
      Cell: ({ renderedCellValue }) => renderedCellValue ? <CheckBox color="primary" /> : <CheckBoxOutlineBlank />,
    },
  ], []);

  const onSaveOrEdit: IOnSaveAndEditRows<MasterDepartureEntity> = async (row, table, values, validation): Promise<void> => {
    if (row.original.isFinish || !row.original.isActive) {
      swalToastInfo('Departure Finished', {
        message: 'A completed entry cannot be edited',
        timer: 3000
      });
      return;
    }
    if (row.original.isEcommerce) {
      swalToastInfo('Departure Ecommerce', {
        message: 'The departure was generated by the ecommerce and cannot be edited.',
        timer: 3000
      });
      return;
    }
    navigate(`${row.original.masterDepartureId}/edit`, { replace: false });
  };

  const onStateChange = async (values: { [key: string]: any }) => {
    const data: any = {
      isActive: !values.isActive,
      masterDepartureId: values.masterDepartureId
    };
  };

  const onFinishEntry = async (values: { [key: string]: any }) => {
    swalToastQuestion('Finalize Departure', {
      message: `Are you sure you want to finalize departure ${values.code}? \n You will not be able to edit it after this action`,
      showConfirmButton: true,
      confirmButtonText: 'Assign',
      showCancelButton: true,
      cancelButtonText: 'Cancel'
    }).then(result => {
      if(result.isConfirmed) {
        const title = 'Finalize Departure!';
        swalToastWait(title, {
          message: 'Please wait a few minutes',
          showLoading: true,
        });
        mutationFinished.mutateAsync(values)
          .then(() => {
            swalToastSuccess('Finished', { showConfirmButton: false, timer: 2000 });
          })
          .catch((err) => { swalToastError(err.message, { showConfirmButton: false, timer: 3000 }); });
      }
    });
  };

  return (
    <Paper elevation={4}>
      <MaterialTable<MasterDepartureEntity>
        columns={columns}
        data={data || []}
        enableRowActions
        columnsVisible={{ masterDepartureId: false }}
        setRef={setRef}
        pagination={pagination}
        rowCount={rowCount}
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
        AddCustomActions={({ row }) => (
          row.original.isFinish
            ? (
              <IconButton
                sx={{
                  padding: 0
                }}
                disabled={row.original.isFinish}
                onClick={() => onFinishEntry(row.original)}
              >
                <DoneAll color={!row.original.isFinish ? 'success' : 'error'} />
              </IconButton>
            )
            : (
              <Tooltip title="Finished">
                <IconButton
                  sx={{
                    padding: 0
                  }}
                  onClick={() => onFinishEntry(row.original)}
                >
                  <DoneAll color={!row.original.isFinish ? 'success' : 'error'} />
                </IconButton>
              </Tooltip>
            )
        )}
      />
      <ButtonActions title="New" onClick={() => { navigate('new', { replace: false }); }} ubication={isMobile ? {} : { bottom: 99, right: 99 }} />
    </Paper>
  );
};

export default DeparturePage;
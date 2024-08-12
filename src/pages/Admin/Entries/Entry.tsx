import React from 'react';
import type { MRT_ColumnDef, MRT_TableInstance } from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import { Paper, useMediaQuery, Theme, Tooltip, IconButton } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank, DoneAll } from '@mui/icons-material';
import moment from 'moment';
import { IOnSaveAndEditRows } from '@wms/interfaces';
import { MasterEntryEntity } from '@wms/entities';
import { useAlertNotification, useMasterEntry } from '@wms/hooks';
import { MaterialTable, ButtonActions } from '@wms/components';

const EntryPage = () => {
  const { swalToastError, swalToastSuccess, swalToastWait, swalToastQuestion, swalToastInfo } = useAlertNotification();
  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down(768));
  const [ref, setRef] = React.useState<MRT_TableInstance<MasterEntryEntity>>();
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [globalFilter, setGlobalFilter] = React.useState('');
  const { isGenerate, useMasterEntryListQuery, useMasterEntryFinishMutation } = useMasterEntry();
  const { data, isLoading, isError, refetch } = useMasterEntryListQuery({ ...pagination, filter: globalFilter });
  const mutationFinished = useMasterEntryFinishMutation({ ...pagination, filter: globalFilter });
  
  const columns = React.useMemo<MRT_ColumnDef<MasterEntryEntity>[]>(() => [
    {
      id: 'masterEntryId',
      accessorKey: 'masterEntryId',
      header: 'ID',
      enableEditing: false,
      minSize: 150,
    },
    {
      id: 'entryType',
      accessorKey: 'entryType',
      accessorFn: (row) => row.entryType?.description, 
      header: 'Tipo Entrada',
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
    if (row.original.isFinish || !row.original.isActive) {
      swalToastInfo('Entry Finished', {
        message: 'A completed entry cannot be edited',
        timer: 3000
      });
      return;
    }
    navigate(`${row.original.masterEntryId}/edit`, { replace: false });
  };

  const onStateChange = async (values: { [key: string]: any }) => {
    const data: any = {
      isActive: !values.isActive,
      entryId: values.entryId
    };
  };

  const onFinishEntry = async (values: { [key: string]: any }) => {
    swalToastQuestion('Finalize Entry', {
      message: `Are you sure you want to finalize entry ${values.code}? \n You will not be able to edit it after this action`,
      showConfirmButton: true,
      confirmButtonText: 'Assign',
      showCancelButton: true,
      cancelButtonText: 'Cancel'
    }).then(result => {
      if(result.isConfirmed) {
        const title = 'Finalize Entry!';
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

export default EntryPage;
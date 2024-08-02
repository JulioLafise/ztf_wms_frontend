import React from 'react';
import type { MRT_ColumnDef, MRT_TableInstance } from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import { Paper, useMediaQuery, Theme } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import { IOnSaveAndEditRows } from '@wms/interfaces';
import { MasterDepartureEntity } from '@wms/entities';
import { useUI, useMasterDeparture, useAlertNotification } from '@wms/hooks';
import { MaterialTable, ButtonActions } from '@wms/components';
import moment from 'moment';

const DeparturePage = () => {
  // const { swalToastError, swalToastSuccess } = useAlertNotification();
  const navigate = useNavigate();
  const { isMobile } = useUI();
  const { isGenerate, rowCount, useMasterEntryListQuery } = useMasterDeparture();
  const [ref, setRef] = React.useState<MRT_TableInstance<MasterDepartureEntity>>();
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [globalFilter, setGlobalFilter] = React.useState('');
  const { data, isError, isLoading } = useMasterEntryListQuery({ ...pagination, filter: globalFilter });

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
    // {
    //   id: 'customer',
    //   accessorKey: 'customer',
    //   accessorFn: (row) => row.customer.customerUuid, 
    //   header: 'Cliente',
    //   enableEditing: false,
    //   minSize: 150,
    //   Cell: ({ row }) => <p>{row.original.customer.firstName}</p>
    // },
    {
      id: 'purchaseOrderCode',
      accessorKey: 'purchaseOrderCode',
      header: 'Orden de Pedido',
      minSize: 150,
    },
    // {
    //   id: 'typeCurrency',
    //   accessorKey: 'typeCurrency',
    //   accessorFn: (row) => row.typeCurrency.typeCurrencyId, 
    //   header: 'Tipo de Moneda',
    //   minSize: 150,
    //   Cell: ({ row }) => <p>{row.original.typeCurrency.description}</p>
    // },
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

  const onSaveOrEdit: IOnSaveAndEditRows<MasterDepartureEntity> = async (row, table, values, validation): Promise<void> => {
    navigate(`${row.original.masterDepartureId}/edit`, { replace: false });
  };

  const onStateChange = async (values: { [key: string]: any }) => {
    const data: any = {
      isActive: !values.isActive,
      customerVisitControlId: values.customerVisitControlId
    };
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
        // onActionRefreshTable={() => refetch()}
        isLoading={isLoading}
        isGenerate={isGenerate}
        isError={isError}     
        onActionStateChange={(row: any) => onStateChange(row.original)}  
      />
      <ButtonActions title="New" onClick={() => { navigate('new', { replace: false }); }} ubication={isMobile ? {} : { bottom: 99, right: 99 }} />
    </Paper>
  );
};

export default DeparturePage;
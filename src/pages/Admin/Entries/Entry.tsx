import React from 'react';
import type { MRT_ColumnDef, MRT_TableInstance } from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import { Paper, useMediaQuery, Theme } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import { IOnSaveAndEditRows } from '@wms/interfaces';
import { useAlertNotification } from '@wms/hooks';
import { MaterialTable, ButtonActions } from '@wms/components';
import moment from 'moment';

const EntryPage = () => {
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
      id: 'entryId',
      accessorKey: 'entryId',
      header: 'ID',
      enableEditing: false,
      minSize: 150,
    },
    {
      id: 'noEntrada',
      accessorKey: 'noEntrada',
      header: 'No Entrada',
      minSize: 150,
      enableEditing: false,
    },
    {
      id: 'employee',
      accessorKey: 'employee',
      header: 'Empleado',
      enableEditing: false,
      minSize: 150,
    },
    {
      id: 'currencyType',
      accessorKey: 'currencyType',
      header: 'Tipo de Moneda',
      minSize: 150,
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
        columnsVisible={{ entryId: false }}
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
      <ButtonActions title="New" onClick={() => { navigate('new', { replace: false }); }} ubication={isMobile ? {} : { bottom: 99, right: 99 }} />
    </Paper>
  );
};

export default EntryPage;
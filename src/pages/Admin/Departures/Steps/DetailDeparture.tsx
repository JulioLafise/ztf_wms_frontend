import React from 'react';
import type { MRT_ColumnDef, MRT_TableInstance } from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import { Paper, useMediaQuery, Theme } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import { FormProvider, useForm } from 'react-hook-form';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { IOnSaveAndEditRows, IValidationErrors } from '@wms/interfaces';
import { useAlertNotification } from '@wms/hooks';
import { MaterialTable, TextFieldHF } from '@wms/components';

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
  const [rowData, setRowData] = React.useState<any[]>([]);
  const [validationErrors, setValidationErrors] = React.useState<IValidationErrors<object>>({});
  const methods = useForm({
    mode: 'onSubmit'
  });

  const columns = React.useMemo<MRT_ColumnDef<any>[]>(() => [
    {
      id: 'pedidoDetalleId',
      accessorKey: 'pedidoDetalleId',
      header: 'ID',
      enableEditing: false,
      minSize: 150,
    },
    {
      id: 'producto',
      accessorKey: 'producto',
      header: 'Producto',
      minSize: 150,
      editVariant: 'select',
      editSelectOptions: [{ label: 'Laptops #1', value: 'Laptops #1' }, { label: 'Laptops #2', value: 'Laptops #2' }]
    },
    {
      id: 'descripcion',
      accessorKey: 'descripcion',
      header: 'Descripcion',
      minSize: 150,
      enableEditing: false,
    },
    {
      id: 'precio',
      accessorKey: 'precio',
      header: 'Precio',
      enableEditing: false,
      minSize: 150,
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
      editVariant: 'select',
      editSelectOptions: [{ label: 'Bueno', value: 'Bueno' }, { label: 'Regular', value: 'Regular' }, { label: 'Malo', value: 'Malo' }]
    },
  ], [validationErrors]);

  const onSaveOrEdit: IOnSaveAndEditRows<any> = async (row, table, values, validation): Promise<void> => {
    setRowData(prevState => [
      ...prevState,
      {
        ...values,
        descripcion: `${values.producto} equipo de computo kid`,
        precio: '$20'
      }
    ]);
    setValidationErrors({});
    validation!({})(table, row.original.pedidoDetalleId ? true : false);
  };

  return (
    <React.Fragment>
      <Paper elevation={4} sx={{ mb: 2 }}>
        <FormProvider {...methods}>
          <form noValidate className="p-4 flex gap-2 w-full">
            <TextFieldHF
              name="cantidad"
              label="Cantidad"
              className="w-2/6"
              readOnly
            />
            <TextFieldHF
              name="subTotal"
              label="Sub Total"
              className="w-2/6"
              readOnly
            />
            <TextFieldHF
              name="total"
              label="Total"
              className="w-2/6"
              readOnly
            />
          </form>
        </FormProvider>
      </Paper>
      <Paper elevation={4}>
        <MaterialTable
          columns={columns}
          data={rowData || []}
          enableRowActions
          isEditing
          columnsVisible={{ pedidoDetalleId: false }}
          setRef={setRef}
          pagination={pagination}
          rowCount={rowData.length}
          onPaginationChange={setPagination}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
          onActionEdit={onSaveOrEdit}
          onActionSave={onSaveOrEdit}
          // onActionRefreshTable={() => refetch()}
          isLoading={false}
          isGenerate={true}
          isError={false}
          setValidationErrors={setValidationErrors}
        />
      </Paper>
    </React.Fragment>
  );
};

export default DetailDeparture;
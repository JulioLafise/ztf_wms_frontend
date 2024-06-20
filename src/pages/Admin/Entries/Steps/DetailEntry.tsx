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

const DetailEntry = () => {
  const { swalToastSuccess } = useAlertNotification();
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
      id: 'entradaDetalleId',
      accessorKey: 'entradaDetalleId',
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
      id: 'codigoLote',
      accessorKey: 'codigoLote',
      header: 'Codigo Lote',
      enableEditing: true,
      minSize: 150,
    },
    {
      id: 'numeroSerie',
      accessorKey: 'numeroSerie',
      header: 'Numero Serie',
      enableEditing: true,
      minSize: 150,
    },
    // {
    //   id: 'precio',
    //   accessorKey: 'precio',
    //   header: 'Precio',
    //   enableEditing: true,
    //   minSize: 150,
    // },
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
    {
      id: 'descripcion',
      accessorKey: 'descripcion',
      header: 'Observaciones',
      minSize: 150,
      enableEditing: true,
    },
  ], [validationErrors]);

  const onSaveOrEdit: IOnSaveAndEditRows<any> = async (row, table, values, validation): Promise<void> => {
    setRowData(prevState => [
      ...prevState,
      {
        ...values,
        entradaDetalleId: uuid(),
      }
    ]);
    setValidationErrors({});
    validation!({})(table, row.original.pedidoDetalleId ? true : false);
  };

  const onDelete = async (values: { [key: string]: any }) => {
    setRowData(prevState => [
      ...prevState.filter(ft => ft.entradaDetalleId != values.entradaDetalleId)
    ]);
    swalToastSuccess('Delete item', {
      message: 'Success',
      timer: 2000
    });
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
          columnsVisible={{ entradaDetalleId: false }}
          setRef={setRef}
          pagination={pagination}
          rowCount={rowData.length}
          onPaginationChange={setPagination}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
          onActionEdit={onSaveOrEdit}
          onActionSave={onSaveOrEdit}
          onActionDelete={(row) => onDelete(row.original)}
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

export default DetailEntry;
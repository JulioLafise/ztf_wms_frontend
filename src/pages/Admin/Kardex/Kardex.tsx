import React from 'react';
import type { MRT_ColumnDef, MRT_TableInstance } from 'material-react-table';
import { Paper } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import * as Yup from 'yup';
import { IValidationErrors, IOptionsQuery, IOnSaveAndEditRows } from '@wms/interfaces';
import { Validator } from '@wms/helpers';
import { useAlertNotification, useUI, useInventory } from '@wms/hooks';
import { MaterialTable, ButtonActions, EditCheckboxTable } from '@wms/components';
import { AvailableStockEntity } from '@wms/entities';

interface ISchemaValidationTable {
  description?: string,
  isActive?: Yup.Maybe<boolean>
}

const schemaValidationTable: Yup.ObjectSchema<ISchemaValidationTable> = Yup.object().shape({
  description: Yup.string().required('Description is required'),
  isActive: Yup.boolean().notRequired()
});

const KardexPage = () => {
  const { swalToastError, swalToastWait, swalToastSuccess } = useAlertNotification();
  const { isMobile } = useUI();
  const [optionsQuery, setOptionsQuery] = React.useState<IOptionsQuery>({});
  const [isOpen, setIsOpen] = React.useState(false);
  const [edit, setEdit] = React.useState<AvailableStockEntity | null>(null);
  const [ref, setRef] = React.useState<MRT_TableInstance<AvailableStockEntity>>();
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [globalFilter, setGlobalFilter] = React.useState('');
  const { availableStock: { rowCount, isGenerate }, useAvailableStockListQuery } = useInventory();
  const { data, isLoading, isError, refetch } = useAvailableStockListQuery({ ...pagination, filter: globalFilter });
  const [validationErrors, setValidationErrors] = React.useState<IValidationErrors<ISchemaValidationTable>>({});

  const columns = React.useMemo<MRT_ColumnDef<AvailableStockEntity>[]>(() => [
    {
      id: 'inventoryId',
      accessorKey: 'inventoryId',
      header: 'Inventory ID',
      enableEditing: false,
      minSize: 150,
    },
    {
      id: 'product',
      accessorKey: 'product',
      header: 'Producto',
      minSize: 150,
      Cell: ({ renderedCellValue }) => <div className="flex h-12 w-96"><p className="text-wrap break-all">{String(renderedCellValue).slice(0,105)}{String(renderedCellValue).length >= 104 ? '...' : ''}</p></div>
    },
    {
      id: 'category',
      accessorKey: 'category',
      header: 'Categoria',
      minSize: 150,
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
    // {
    //   id: 'quanty',
    //   accessorKey: 'quanty',
    //   header: 'Cantidad',
    //   minSize: 150,
    // },
    // {
    //   id: 'isActive',
    //   accessorKey: 'isActive',
    //   header: 'Activo',
    //   minSize: 150,
    //   editVariant: undefined,
    //   muiEditTextFieldProps: {
    //     required: true,
    //     error: !!validationErrors.isActive,
    //     helperText: validationErrors.isActive,
    //   },
    //   Cell: ({ renderedCellValue }) => renderedCellValue ? <CheckBox color="primary" /> : <CheckBoxOutlineBlank />,
    // },
  ], [validationErrors]);

  const onSaveOrEdit: IOnSaveAndEditRows<AvailableStockEntity> = async (row, table, values, validation): Promise<void> => {
    // if (!isMobile) {
    //   setOptionsQuery({
    //     typeMutation: row.original.brandId ? 'put' : 'post'
    //   });
    //   const data: AvailableStockEntity = {
    //     ...values,
    //     ...checkState,
    //     isActive: row.original.brandId ? row.original.isActive : true
    //   };
    //   const [isPassed, errors] = await Validator.yupSchemaValidation({ schema: schemaValidationTable, data });
    //   if (!isPassed) { setValidationErrors(errors); validation!(errors)(table, row.original.brandId ? true : false); return; }
    //   setValidationErrors({});
    //   validation!({})(table, row.original.brandId ? true : false);
    //   onTransaction({ brandId: row.original.brandId, ...data });
    // }
    // else {
    //   setEdit(row.original);
    //   setIsOpen(true);
    // }
  };

  const onSubmit = (values: { [x: string]: any }) => {
    setOptionsQuery({
      typeMutation: values.brandId ? 'put' : 'post'
    });
    onTransaction(values);
  };

  const onTransaction = (values: { [x: string]: any }) => {
    const title = !values.brandId ? 'Saving Brand!' : 'Updating Brand!';
    swalToastWait(title, {
      message: 'Please wait a few minutes',
      showLoading: true,
    });
    // mutation.mutateAsync(values)
    //   .then(() => {
    //     setIsOpen(false);
    //     setEdit(null);
    //     swalToastSuccess('Finished', { showConfirmButton: false, timer: 2000 });
    //   })
    //   .catch((err) => { swalToastError(err.message, { showConfirmButton: false, timer: 3000 }); });
  };

  const onChangeState = async (values: { [key: string]: any }) => {
    setOptionsQuery({ typeMutation: 'delete' });
    const title = values.isActive ? 'Desactive Brand!' : 'Active Brand!';
    swalToastWait(title, {
      message: 'Please wait a few minutes',
      showLoading: true,
    });
    // mutation.mutateAsync(values)
    //   .then(() => {
    //     setIsOpen(false);
    //     setEdit(null);
    //     swalToastSuccess('Finished', { showConfirmButton: false, timer: 2000 });
    //   })
    //   .catch((err) => { swalToastError(err.message, { showConfirmButton: false, timer: 3000 }); });
  };

  return (
    <Paper elevation={4}>
      <MaterialTable<AvailableStockEntity>
        columns={columns}
        data={data || []}
        // enableRowActions
        columnsVisible={{ inventoryId: false }}
        setRef={setRef}
        pagination={pagination}
        rowCount={rowCount}
        onPaginationChange={setPagination}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        // isEditing={!isMobile}
        onActionEdit={onSaveOrEdit}
        onActionSave={onSaveOrEdit}
        isLoading={isLoading}
        onActionStateChange={(row) => onChangeState(row.original)}
        isGenerate={isGenerate}
        isError={isError}
        setValidationErrors={setValidationErrors}
        onActionRefreshTable={() => refetch()}
      />
      {/* {isMobile && <ButtonActions title="New" onClick={() => { setIsOpen(true); setEdit(null); }} />} */}
    </Paper>
  );
};

export default KardexPage;
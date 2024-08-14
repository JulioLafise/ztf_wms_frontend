import React from 'react';
import type { MRT_ColumnDef, MRT_TableInstance } from 'material-react-table';
import { Paper } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import * as Yup from 'yup';
import { IValidationErrors, IOptionsQuery, IOnSaveAndEditRows } from '@wms/interfaces';
import { Validator } from '@wms/helpers';
import { useAlertNotification, useUI, useProductStatus } from '@wms/hooks';
import { MaterialTable, ButtonActions, EditCheckboxTable } from '@wms/components';
import { ProductStatusEntity } from '@wms/entities';
import ProductStatusModal from './ProductStatusModal';

interface ISchemaValidationTable {
  description?: string,
  isActive?: Yup.Maybe<boolean>
}

const schemaValidationTable: Yup.ObjectSchema<ISchemaValidationTable> = Yup.object().shape({
  description: Yup.string().required('Description is required'),
  isActive: Yup.boolean().notRequired()
});

const ProductStatusPage = () => {
  const { swalToastError, swalToastWait, swalToastSuccess } = useAlertNotification();
  const { isMobile } = useUI();
  const [optionsQuery, setOptionsQuery] = React.useState<IOptionsQuery>({});
  const [isOpen, setIsOpen] = React.useState(false);
  const [checkState, setCheckState] = React.useState<Partial<ProductStatusEntity>>({
    isActive: false,
  });
  const [edit, setEdit] = React.useState<ProductStatusEntity | null>(null);
  const [ref, setRef] = React.useState<MRT_TableInstance<ProductStatusEntity>>();
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [globalFilter, setGlobalFilter] = React.useState('');
  const { isGenerate, rowCount, useProductStatusListQuery, useProductStatusMutation } = useProductStatus();
  const { data, isLoading, isError, refetch } = useProductStatusListQuery({ ...pagination, filter: globalFilter });
  const mutation = useProductStatusMutation({ ...pagination, filter: globalFilter }, optionsQuery);
  const [validationErrors, setValidationErrors] = React.useState<IValidationErrors<ISchemaValidationTable>>({});

  const columns = React.useMemo<MRT_ColumnDef<ProductStatusEntity>[]>(() => [
    {
      id: 'productStatusId',
      accessorKey: 'productStatusId',
      header: 'Marca ID',
      enableEditing: false,
      minSize: 150,
    },
    {
      id: 'description',
      accessorKey: 'description',
      header: 'Descripcion',
      minSize: 150,
      muiEditTextFieldProps: {      
        required: true,
        error: !!validationErrors.description,
        helperText: validationErrors.description
      },
    },
    {
      id: 'isActive',
      accessorKey: 'isActive',
      header: 'Activo',
      minSize: 150,
      enableEditing: false,
      editVariant: undefined,
      muiEditTextFieldProps: {
        required: true,
        error: !!validationErrors.isActive,
        helperText: validationErrors.isActive,
      },
      Edit: (props) => <EditCheckboxTable {...props} setCheckState={setCheckState} />,
      Cell: ({ renderedCellValue }) => renderedCellValue ? <CheckBox color="primary" /> : <CheckBoxOutlineBlank />,
    },
  ], [validationErrors]);

  const onSaveOrEdit: IOnSaveAndEditRows<ProductStatusEntity> = async (row, table, values, validation): Promise<void> => {
    if (!isMobile) {
      setOptionsQuery({
        typeMutation: row.original.productStatusId ? 'put' : 'post'
      });
      const data: ProductStatusEntity = {
        ...values,
        ...checkState,
        isActive: row.original.productStatusId ? row.original.isActive : true
      };
      const [isPassed, errors] = await Validator.yupSchemaValidation({ schema: schemaValidationTable, data });
      if (!isPassed) { setValidationErrors(errors); validation!(errors)(table, row.original.productStatusId ? true : false); return; }
      setValidationErrors({});
      validation!({})(table, row.original.productStatusId ? true : false);
      onTransaction({ productStatusId: row.original.productStatusId, ...data });
    }
    else {
      setEdit(row.original);
      setIsOpen(true);
    }
  };

  const onSubmit = (values: { [x: string]: any }) => {
    setOptionsQuery({
      typeMutation: values.productStatusId ? 'put' : 'post'
    });
    onTransaction(values);
  };

  const onTransaction = (values: { [x: string]: any }) => {
    const title = !values.productStatusId ? 'Saving Product Status!' : 'Updating Product Status!';
    swalToastWait(title, {
      message: 'Please wait a few minutes',
      showLoading: true,
    });
    mutation.mutateAsync(values)
      .then(() => {
        setIsOpen(false);
        setEdit(null);
        swalToastSuccess('Finished', { showConfirmButton: false, timer: 2000 });
      })
      .catch((err) => { swalToastError(err.message, { showConfirmButton: false, timer: 3000 }); });
  };

  const onChangeState = async (values: { [key: string]: any }) => {
    setOptionsQuery({ typeMutation: 'delete'});
    const title = values.isActive ? 'Desactive Product Status!' : 'Active Product Status!';
    swalToastWait(title, {
      message: 'Please wait a few minutes',
      showLoading: true,
    });
    mutation.mutateAsync(values)
      .then(() => {
        setIsOpen(false);
        setEdit(null);
        swalToastSuccess('Finished', { showConfirmButton: false, timer: 2000 });
      })
      .catch((err) => { swalToastError(err.message, { showConfirmButton: false, timer: 3000 }); });
  };

  return (
    <Paper elevation={4}>
      <MaterialTable<ProductStatusEntity>
        columns={columns}
        data={data || []}
        enableRowActions
        columnsVisible={{ productStatusId: false }}
        setRef={setRef}
        pagination={pagination}
        rowCount={rowCount}
        onPaginationChange={setPagination}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        isEditing={!isMobile}
        onActionEdit={onSaveOrEdit}
        onActionSave={onSaveOrEdit}
        isLoading={isLoading}
        onActionStateChange={(row) => onChangeState(row.original)}
        isGenerate={isGenerate}
        isError={isError}
        setValidationErrors={setValidationErrors} 
        onActionRefreshTable={() => refetch()}       
      />
      {isMobile && <ButtonActions title="New" onClick={() => { setIsOpen(true); setEdit(null); }} />}
      <ProductStatusModal isOpen={isOpen} setIsOpen={setIsOpen} onSubmit={onSubmit} isLoading={mutation.isPending} edit={edit} />
    </Paper>
  );
};

export default ProductStatusPage;
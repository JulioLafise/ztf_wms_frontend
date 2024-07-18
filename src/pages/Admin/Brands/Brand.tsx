import React from 'react';
import type { MRT_ColumnDef, MRT_TableInstance } from 'material-react-table';
import { Paper } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import * as Yup from 'yup';
import { IValidationErrors, IOptionsQuery, IOnSaveAndEditRows } from '@wms/interfaces';
import { Validator } from '@wms/helpers';
import { useAlertNotification, useUI, useBrand } from '@wms/hooks';
import { MaterialTable, ButtonActions, EditCheckboxTable } from '@wms/components';
import { BrandEntity } from '@wms/entities';
import BrandModal from './BrandModal';

interface ISchemaValidationTable {
  description?: string,
  isActive?: Yup.Maybe<boolean>
}

const schemaValidationTable: Yup.ObjectSchema<ISchemaValidationTable> = Yup.object().shape({
  description: Yup.string().required('Description is required'),
  isActive: Yup.boolean().notRequired()
});

const BrandPage = () => {
  const { swalToastError, swalToastWait, swalToastSuccess } = useAlertNotification();
  const { isMobile } = useUI();
  const [optionsQuery, setOptionsQuery] = React.useState<IOptionsQuery>({});
  const [isOpen, setIsOpen] = React.useState(false);
  const [checkState, setCheckState] = React.useState<Partial<BrandEntity>>({
    isActive: false,
  });
  const [edit, setEdit] = React.useState<BrandEntity | null>(null);
  const [ref, setRef] = React.useState<MRT_TableInstance<BrandEntity>>();
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [globalFilter, setGlobalFilter] = React.useState('');
  const { isGenerate, rowCount, useBrandListQuery, useBrandMutation } = useBrand();
  const { data, isLoading, isError, refetch } = useBrandListQuery({ ...pagination, filter: globalFilter });
  const mutation = useBrandMutation({ ...pagination, filter: globalFilter }, optionsQuery);
  const [validationErrors, setValidationErrors] = React.useState<IValidationErrors<ISchemaValidationTable>>({});

  const columns = React.useMemo<MRT_ColumnDef<BrandEntity>[]>(() => [
    {
      id: 'brandId',
      accessorKey: 'brandId',
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

  const onSaveOrEdit: IOnSaveAndEditRows<BrandEntity> = async (row, table, values, validation): Promise<void> => {
    if (!isMobile) {
      setOptionsQuery({
        typeMutation: row.original.brandId ? 'put' : 'post'
      });
      const data: BrandEntity = {
        ...values,
        ...checkState,
        isActive: row.original.brandId ? row.original.isActive : true
      };
      const [isPassed, errors] = await Validator.yupSchemaValidation({ schema: schemaValidationTable, data });
      if (!isPassed) { setValidationErrors(errors); validation!(errors)(table, row.original.brandId ? true : false); return; }
      setValidationErrors({});
      validation!({})(table, row.original.brandId ? true : false);
      onTransaction({ brandId: row.original.brandId, ...data });
    }
    else {
      setEdit(row.original);
      setIsOpen(true);
    }
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
    const title = values.isActive ? 'Desactive Brand!' : 'Active Brand!';
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
      <MaterialTable<BrandEntity>
        columns={columns}
        data={data || []}
        enableRowActions
        columnsVisible={{ brandId: false }}
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
      <BrandModal isOpen={isOpen} setIsOpen={setIsOpen} onSubmit={onSubmit} isLoading={mutation.isPending} edit={edit} />
    </Paper>
  );
};

export default BrandPage;
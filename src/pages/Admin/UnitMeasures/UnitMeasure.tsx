import React from 'react';
import type { MRT_ColumnDef, MRT_TableInstance } from 'material-react-table';
import { Paper } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import * as Yup from 'yup';
import { IValidationErrors, IOptionsQuery, IOnSaveAndEditRows } from '@wms/interfaces';
import { Validator } from '@wms/helpers';
import { useAlertNotification, useUI, useUnitMeasure } from '@wms/hooks';
import { MaterialTable, ButtonActions, EditCheckboxTable } from '@wms/components';
import { UnitMeasureEntity } from '@wms/entities';
// import TypePersoneryModal from './TypePersoneryModal';

interface ISchemaValidationTable {
  description?: string,
  abbreviation?: string,
  isActive?: Yup.Maybe<boolean>
}

const schemaValidationTable: Yup.ObjectSchema<ISchemaValidationTable> = Yup.object().shape({
  description: Yup.string().required('Description is required'),
  abbreviation: Yup.string().required('Abbreviation is required'),
  isActive: Yup.boolean()
});

const UnitMeasurePage = () => {
  const { swalToastError, swalToastWait, swalToastSuccess } = useAlertNotification();
  const { isMobile } = useUI();
  const [optionsQuery, setOptionsQuery] = React.useState<IOptionsQuery>({});
  const [isOpen, setIsOpen] = React.useState(false);
  const [checkState, setCheckState] = React.useState<Partial<UnitMeasureEntity>>({
    isActive: false,
  });
  const [edit, setEdit] = React.useState<UnitMeasureEntity | null>(null);
  const [ref, setRef] = React.useState<MRT_TableInstance<UnitMeasureEntity>>();
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [globalFilter, setGlobalFilter] = React.useState('');
  const { isGenerate, rowCount, useUnitMeasureListQuery, useUnitMeasureMutation } = useUnitMeasure();
  const { data, isLoading, isError, refetch } = useUnitMeasureListQuery({ ...pagination, filter: globalFilter });
  const mutation = useUnitMeasureMutation({ ...pagination, filter: globalFilter }, optionsQuery);
  const [validationErrors, setValidationErrors] = React.useState<IValidationErrors<ISchemaValidationTable>>({});

  const columns = React.useMemo<MRT_ColumnDef<UnitMeasureEntity>[]>(() => [
    {
      id: 'unitMeasureId',
      accessorKey: 'unitMeasureId',
      header: 'Unidad de Medida ID',
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
      id: 'abbreviation',
      accessorKey: 'abbreviation',
      header: 'Abreviacion',
      minSize: 150,
      muiEditTextFieldProps: {      
        required: true,
        error: !!validationErrors.abbreviation,
        helperText: validationErrors.abbreviation
      },
    },
    {
      id: 'isActive',
      accessorKey: 'isActive',
      header: 'Active',
      minSize: 150,
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

  const onSaveOrEdit: IOnSaveAndEditRows<UnitMeasureEntity> = async (row, table, values, validation): Promise<void> => {
    if (!isMobile) {
      setOptionsQuery({
        typeMutation: row.original.unitMeasureId ? 'put' : 'post'
      });
      const data: UnitMeasureEntity = {
        ...values, ...checkState
      };
      const [isPassed, errors] = await Validator.yupSchemaValidation({ schema: schemaValidationTable, data });
      if (!isPassed) { setValidationErrors(errors); validation!(errors)(table, row.original.unitMeasureId ? true : false); return; }
      setValidationErrors({});
      validation!({})(table, row.original.unitMeasureId ? true : false);
      onTransaction({ unitMeasureId: row.original.unitMeasureId, ...data });
    }
    else {
      setEdit(row.original);
      setIsOpen(true);
    }
  };

  const onSubmit = (values: { [x: string]: any }) => {
    setOptionsQuery({
      typeMutation: values.unitMeasureId ? 'put' : 'post'
    });
    onTransaction(values);
  };

  const onTransaction = (values: { [x: string]: any }) => {
    const title = !values.unitMeasureId ? 'Saving Unit Measure!' : 'Updating Unit Measure!';
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
      <MaterialTable<UnitMeasureEntity>
        columns={columns}
        data={data || []}
        enableRowActions
        columnsVisible={{ unitMeasureId: false }}
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
        isGenerate={isGenerate}
        isError={isError}
        setValidationErrors={setValidationErrors} 
        onActionRefreshTable={() => refetch()}       
      />
      {isMobile && <ButtonActions title="New" onClick={() => { setIsOpen(true); setEdit(null); }} />}
      {/* <TypePersoneryModal isOpen={isOpen} setIsOpen={setIsOpen} onSubmit={onSubmit} isLoading={mutation.isPending} edit={edit} /> */}
    </Paper>
  );
};

export default UnitMeasurePage;
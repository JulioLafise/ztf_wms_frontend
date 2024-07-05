import React from 'react';
import type { MRT_ColumnDef, MRT_TableInstance } from 'material-react-table';
import { IconButton, InputAdornment, Paper } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank, FormatColorFill } from '@mui/icons-material';
import * as Yup from 'yup';
import { IValidationErrors, IOptionsQuery, IOnSaveAndEditRows } from '@wms/interfaces';
import { Validator } from '@wms/helpers';
import { useAlertNotification, useUI, useColor } from '@wms/hooks';
import { MaterialTable, ButtonActions, EditCheckboxTable } from '@wms/components';
import { ColorEntity } from '@wms/entities';
import ColorModal from './ColorModal';

interface ISchemaValidationTable {
  color?: string,
  isActive?: Yup.Maybe<boolean>
}

const schemaValidationTable: Yup.ObjectSchema<ISchemaValidationTable> = Yup.object().shape({
  color: Yup.string().required('Description is required'),
  isActive: Yup.boolean().notRequired()
});

const ColorPage = () => {
  const { swalToastError, swalToastWait, swalToastSuccess } = useAlertNotification();
  const [colors, setColors] = React.useState<string>('');
  const { isMobile } = useUI();
  const [optionsQuery, setOptionsQuery] = React.useState<IOptionsQuery>({});
  const [isOpen, setIsOpen] = React.useState(false);
  const [checkState, setCheckState] = React.useState<Partial<ColorEntity>>({
    isActive: false,
  });
  const [edit, setEdit] = React.useState<ColorEntity | null>(null);
  const [ref, setRef] = React.useState<MRT_TableInstance<ColorEntity>>();
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [globalFilter, setGlobalFilter] = React.useState('');
  const { isGenerate, rowCount, useColorListQuery, useColorMutation } = useColor();
  const { data, isLoading, isError, refetch } = useColorListQuery({ ...pagination, filter: globalFilter });
  const mutation = useColorMutation({ ...pagination, filter: globalFilter }, optionsQuery);
  const [validationErrors, setValidationErrors] = React.useState<IValidationErrors<ISchemaValidationTable>>({});

  const columns = React.useMemo<MRT_ColumnDef<ColorEntity>[]>(() => [
    {
      id: 'colorId',
      accessorKey: 'colorId',
      header: 'Color ID',
      enableEditing: false,
      minSize: 150,
    },
    {
      id: 'color',
      accessorKey: 'color',
      header: 'Descripcion',
      minSize: 150,
      muiEditTextFieldProps: {      
        required: true,
        error: !!validationErrors.color,
        helperText: validationErrors.color,
        onChange: (_e) => { setColors(_e.target.value); },
        onBlur: (_e) => { setColors(_e.target.value); },
        InputProps: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="color-fill"
              >
                <FormatColorFill fontSize="small" sx={{ color: colors }} />
              </IconButton>
            </InputAdornment>
          )
        }
      },
      Cell: ({ renderedCellValue }) => <>{renderedCellValue} <FormatColorFill sx={{ color: renderedCellValue as string }} /></> 
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

  const onSaveOrEdit: IOnSaveAndEditRows<ColorEntity> = async (row, table, values, validation): Promise<void> => {
    if (!isMobile) {
      setOptionsQuery({
        typeMutation: row.original.colorId ? 'put' : 'post'
      });
      const data: ColorEntity = {
        ...values,
        ...checkState,
        isActive: row.original.colorId ? row.original.isActive : true
      };
      const [isPassed, errors] = await Validator.yupSchemaValidation({ schema: schemaValidationTable, data });
      if (!isPassed) { setValidationErrors(errors); validation!(errors)(table, row.original.colorId ? true : false); return; }
      setValidationErrors({});
      validation!({})(table, row.original.colorId ? true : false);
      onTransaction({ colorId: row.original.colorId, ...data });
    }
    else {
      setEdit(row.original);
      setIsOpen(true);
    }
  };

  const onSubmit = (values: { [x: string]: any }) => {
    setOptionsQuery({
      typeMutation: values.colorId ? 'put' : 'post'
    });
    onTransaction(values);
  };

  const onTransaction = (values: { [x: string]: any }) => {
    const title = !values.colorId ? 'Saving Color!' : 'Updating Color!';
    swalToastWait(title, {
      message: 'Please wait a few minutes',
      showLoading: true,
    });
    mutation.mutateAsync(values)
      .then(() => {
        setIsOpen(false);
        setEdit(null);
        setColors('');
        swalToastSuccess('Finished', { showConfirmButton: false, timer: 2000 });
      })
      .catch((err) => { swalToastError(err.message, { showConfirmButton: false, timer: 3000 }); });
  };

  const onChangeState = async (values: { [key: string]: any }) => {
    setOptionsQuery({ typeMutation: 'delete'});
    const title = values.isActive ? 'Desactive Color!' : 'Active Color!';
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
      <MaterialTable<ColorEntity>
        columns={columns}
        data={data || []}
        enableRowActions
        columnsVisible={{ colorId: false }}
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
        onEditingRowChange={() => { setColors(''); }} 
      />
      {isMobile && <ButtonActions title="New" onClick={() => { setIsOpen(true); setEdit(null); }} />}
      <ColorModal isOpen={isOpen} setIsOpen={setIsOpen} onSubmit={onSubmit} isLoading={mutation.isPending} edit={edit} />
    </Paper>
  );
};

export default ColorPage;
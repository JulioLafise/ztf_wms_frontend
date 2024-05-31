import React from 'react';
import type { MRT_ColumnDef, MRT_TableInstance } from 'material-react-table';
import { Paper } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import * as Yup from 'yup';
import { IValidationErrors, IOptionsQuery, IOnSaveAndEditRows, ComboBoxSelectTable } from '@wms/interfaces';
import { Validator } from '@wms/helpers';
import { useAlertNotification, useUI, useWarehouse, useCountry } from '@wms/hooks';
import { MaterialTable, ButtonActions, EditCheckboxTable } from '@wms/components';
import { WarehouseEntity } from '@wms/entities';
import WarehouseModal from './WarehouseModal';

interface ISchemaValidationTable {
  description?: string,
  departamentId?: number,
  isActive?: Yup.Maybe<boolean>
}

const schemaValidationTable: Yup.ObjectSchema<ISchemaValidationTable> = Yup.object().shape({
  description: Yup.string().required('Description is required'),
  departamentId: Yup.number().required('Departament is required'),
  isActive: Yup.boolean().notRequired()
});

type ComboBoxItems = { departaments: object[], countries: object[] };

const ModelPage = () => {
  const [countryId, setCountryId] = React.useState<number>(1);
  const { swalToastError, swalToastWait, swalToastSuccess } = useAlertNotification();
  const { isMobile } = useUI();
  const [optionsQuery, setOptionsQuery] = React.useState<IOptionsQuery>({});
  const [isOpen, setIsOpen] = React.useState(false);
  const [checkState, setCheckState] = React.useState<Partial<WarehouseEntity>>({
    isActive: false,
  });
  const [selectData, setSelectData] = React.useState<ComboBoxSelectTable<ComboBoxItems>>({
    departaments: [],
    countries: [],
  });
  const [edit, setEdit] = React.useState<WarehouseEntity | null>(null);
  const [ref, setRef] = React.useState<MRT_TableInstance<WarehouseEntity>>();
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [globalFilter, setGlobalFilter] = React.useState('');
  const { useDepartamentQuery, useCountryListQuery } = useCountry();
  const { isGenerate, rowCount, useWarehouseListQuery, useWarehouseMutation } = useWarehouse();
  const { data, isLoading, isError, refetch } = useWarehouseListQuery({ ...pagination, filter: globalFilter });
  const { data: countriesData } = useCountryListQuery({ pageIndex: 0, pageSize: 100, filter: globalFilter });
  const { data: departamentsData } = useDepartamentQuery({ countryId });
  const mutation = useWarehouseMutation({ ...pagination, filter: globalFilter }, optionsQuery);
  const [validationErrors, setValidationErrors] = React.useState<IValidationErrors<ISchemaValidationTable>>({});

  const columns = React.useMemo<MRT_ColumnDef<WarehouseEntity>[]>(() => [
    {
      id: 'warehouseId',
      accessorKey: 'warehouseId',
      header: 'Warehouse ID',
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
      id: 'countryId',
      accessorKey: 'countryId',
      accessorFn: (row) => row.departament?.countryId,
      header: 'Pais',
      minSize: 150,
      editVariant: 'select',
      muiEditTextFieldProps: {      
        required: true,
        error: !!validationErrors.departamentId,
        helperText: validationErrors.departamentId,
        onChange: (_event) => { setCountryId(Number(_event.target.value)); }
      },
      editSelectOptions: selectData.countries,
      Cell: ({ row }) => <span>{countriesData?.filter(ft => ft.countryId === row.original.departament?.countryId)[0].description}</span>
    },
    {
      id: 'departamentId',
      accessorKey: 'departamentId',
      accessorFn: (row) => row.departament?.departamentId,
      header: 'Departamento',
      minSize: 150,
      editVariant: 'select',
      muiEditTextFieldProps: {      
        required: true,
        error: !!validationErrors.departamentId,
        helperText: validationErrors.departamentId
      },
      editSelectOptions: selectData.departaments,
      Cell: ({ row }) => <span>{row.original.departament?.description}</span>
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
  ], [validationErrors, selectData]);

  const onSaveOrEdit: IOnSaveAndEditRows<WarehouseEntity> = async (row, table, values, validation): Promise<void> => {
    if (!isMobile) {
      setOptionsQuery({
        typeMutation: row.original.warehouseId ? 'put' : 'post'
      });
      const data: WarehouseEntity = {
        ...values,
        ...checkState,
        isActive: row.original.warehouseId ? row.original.isActive : true
      };
      const [isPassed, errors] = await Validator.yupSchemaValidation({ schema: schemaValidationTable, data });
      if (!isPassed) { setValidationErrors(errors); validation!(errors)(table, row.original.warehouseId ? true : false); return; }
      setValidationErrors({});
      validation!({})(table, row.original.warehouseId ? true : false);
      onTransaction({ warehouseId: row.original.warehouseId, ...data });
    }
    else {
      setEdit(row.original);
      setIsOpen(true);
    }
  };

  const onSubmit = (values: { [x: string]: any }) => {
    setOptionsQuery({
      typeMutation: values.warehouseId ? 'put' : 'post'
    });
    onTransaction(values);
  };

  const onTransaction = (values: { [x: string]: any }) => {
    const title = !values.warehouseId ? 'Saving Warehouse!' : 'Updating Warehouse!';
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
    const title = values.isActive ? 'Desactive Warehouse!' : 'Active Warehouse!';
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

  React.useEffect(() => {
    if (departamentsData) {
      setSelectData(oldData => ({ ...oldData, departaments: departamentsData.map(obj => ({ label: obj.description, value: obj.departamentId })) }));
    }
    if (countriesData) {
      setSelectData(oldData => ({ ...oldData, countries: countriesData.map(obj => ({ label: obj.description, value: obj.countryId })) }));
    }
  }, [departamentsData, countriesData, countryId]);

  return (
    <Paper elevation={4}>
      <MaterialTable<WarehouseEntity>
        columns={columns}
        data={data || []}
        enableRowActions
        columnsVisible={{ warehouseId: false }}
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
        onEditingRowChange={({ row }) => {
          !isMobile && !!row.original.departament?.countryId && setCountryId(row.original.departament.countryId);
        }}
        onActionRefreshTable={() => refetch()}       
      />
      {isMobile && <ButtonActions title="New" onClick={() => { setIsOpen(true); setEdit(null); }} />}
      <WarehouseModal isOpen={isOpen} setIsOpen={setIsOpen} onSubmit={onSubmit} isLoading={mutation.isPending} edit={edit} />
    </Paper>
  );
};

export default ModelPage;
import React from 'react';
import type { MRT_ColumnDef, MRT_TableInstance } from 'material-react-table';
import { Paper } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import { IOptionsQuery, IOnSaveAndEditRows } from '@wms/interfaces';
import { useAlertNotification, useEmployee, useUI } from '@wms/hooks';
import { MaterialTable, ButtonActions } from '@wms/components';
import { CountryEntity, EmployeeEntity } from '@wms/entities';
import EmployeeModal from './EmployeeModal';

const EmployeePage = () => {
  const { swalToastError, swalToastWait, swalToastSuccess } = useAlertNotification();
  const { isMobile } = useUI();
  const [optionsQuery, setOptionsQuery] = React.useState<IOptionsQuery>({});
  const [isOpen, setIsOpen] = React.useState(false);
  const [edit, setEdit] = React.useState<EmployeeEntity | null>(null);
  const [ref, setRef] = React.useState<MRT_TableInstance<EmployeeEntity>>();
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [globalFilter, setGlobalFilter] = React.useState('');
  const { isGenerate, rowCount, useEmployeeListQuery, useEmployeeMutation } = useEmployee();
  const { data, isLoading, isError, refetch } = useEmployeeListQuery({ ...pagination, filter: globalFilter });
  const mutation = useEmployeeMutation({ ...pagination, filter: globalFilter }, optionsQuery);

  const getCountriesDescription = (countries: CountryEntity[]) => {
    let countriesName: string[] = [];
    countries?.forEach(country => {
      countriesName = [
        ...countriesName,
        country.description
      ];
    });
    return countriesName.join(', ');
  };

  const columns = React.useMemo<MRT_ColumnDef<EmployeeEntity>[]>(() => [
    {
      id: 'employeeId',
      accessorKey: 'employeeId',
      header: 'Employee ID',
      enableEditing: false,
      minSize: 150,
    },
    {
      id: 'code',
      accessorKey: 'code',
      header: 'Codigo',
      minSize: 150,
    },
    {
      id: 'firstName',
      accessorKey: 'firstName',
      header: 'Nombres',
      minSize: 150,
    },
    {
      id: 'lastName',
      accessorKey: 'lastName',
      header: 'Apellidos',
      minSize: 150,
    },
    {
      id: 'countries',
      accessorKey: 'countries', 
      header: 'Paises',
      minSize: 150,
      Cell: ({ row }) => <p>{getCountriesDescription(row.original.countries)}</p>
    },
    {
      id: 'isActive',
      accessorKey: 'isActive',
      header: 'Activo',
      minSize: 150,
      enableEditing: false,
      editVariant: undefined,
      Cell: ({ renderedCellValue }) => renderedCellValue ? <CheckBox color="primary" /> : <CheckBoxOutlineBlank />,
    },
  ], []);

  const onSaveOrEdit: IOnSaveAndEditRows<EmployeeEntity> = async (row, table, values, validation): Promise<void> => {
    setEdit(row.original);
    setIsOpen(true);
  };

  const onSubmit = (values: { [x: string]: any }) => {
    setOptionsQuery({
      typeMutation: values.employeeId ? 'put' : 'post'
    });
    onTransaction(values);
  };

  const onTransaction = (values: { [x: string]: any }) => {
    const title = !values.employeeId ? 'Saving Employee!' : 'Updating Employee!';
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
    const title = values.isActive ? 'Desactive Employee!' : 'Active Employee!';
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
      <MaterialTable<EmployeeEntity>
        columns={columns}
        data={data || []}
        enableRowActions
        columnsVisible={{ employeeId: false, }}
        setRef={setRef}
        pagination={pagination}
        rowCount={rowCount}
        onPaginationChange={setPagination}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        onActionEdit={onSaveOrEdit}
        onActionSave={onSaveOrEdit}
        isLoading={isLoading}
        onActionStateChange={(row) => onChangeState(row.original)}
        isGenerate={isGenerate}
        isError={isError}
        onActionRefreshTable={() => refetch()}       
      />
      <ButtonActions title="New" onClick={() => { setIsOpen(true); setEdit(null); }} ubication={isMobile ? {} : { bottom: 99, right: 99 }} />
      <EmployeeModal isOpen={isOpen} setIsOpen={setIsOpen} onSubmit={onSubmit} isLoading={mutation.isPending} edit={edit} />
    </Paper>
  );
};

export default EmployeePage;
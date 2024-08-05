import React from 'react';
import type { MRT_ColumnDef, MRT_TableInstance } from 'material-react-table';
import { Paper } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import { IOptionsQuery, IOnSaveAndEditRows } from '@wms/interfaces';
import { paginateArray } from '@wms/helpers';
import { useAlertNotification, useUI, useUser } from '@wms/hooks';
import { MaterialTable, ButtonActions } from '@wms/components';
import { UserEntity } from '@wms/entities';
import UsersModal from './UsersModal';

const UnitMeasurePage = () => {
  const { swalToastError, swalToastWait, swalToastSuccess, swalToastWarn } = useAlertNotification();
  const { isMobile } = useUI();
  const [optionsQuery, setOptionsQuery] = React.useState<IOptionsQuery>({});
  const [isOpen, setIsOpen] = React.useState(false);
  const [edit, setEdit] = React.useState<UserEntity | null>(null);
  const [ref, setRef] = React.useState<MRT_TableInstance<UserEntity>>();
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [globalFilter, setGlobalFilter] = React.useState('');
  const { isGenerate, rowCount, useUsersListQuery, useUserMutation } = useUser();
  const { data, isLoading, isError, refetch } = useUsersListQuery();
  const mutation = useUserMutation({ ...pagination, filter: globalFilter }, optionsQuery);
  const paginateData = React.useMemo(() => paginateArray(data, pagination.pageSize, pagination.pageIndex), [data, pagination]);

  const getStatusColor = (status: any) => {
    switch (status) {
      case 'PENDING':
        return 'bg-amber-400';
      case 'CONFIRMED':
        return 'bg-green-400';
      default:
        return 'bg-amber-400';
    }
  };

  const columns = React.useMemo<MRT_ColumnDef<UserEntity>[]>(() => [
    {
      id: 'userId',
      accessorKey: 'userId',
      header: 'User ID',
      enableEditing: false,
      minSize: 150,
    },
    {
      id: 'email',
      accessorKey: 'email',
      header: 'Email',
      minSize: 150,
    },
    {
      id: 'rolGroup',
      accessorKey: 'rolGroup',
      header: 'Group',
      minSize: 150,
    },
    {
      id: 'createdAt',
      accessorKey: 'createdAt',
      header: 'Created At',
      minSize: 150,
    },
    {
      id: 'accountStatus',
      accessorKey: 'accountStatus',
      header: 'Account Status',
      minSize: 150,
      Cell: ({ renderedCellValue }) => <div className="flex items-center"><p className={`p-2 ${getStatusColor(renderedCellValue)} rounded font-bold`}>{renderedCellValue}</p></div>
    },
    {
      id: 'isVerified',
      accessorKey: 'isVerified',
      header: 'Account Verified',
      minSize: 150,
      Cell: ({ renderedCellValue }) => renderedCellValue ? <CheckBox color="primary" /> : <CheckBoxOutlineBlank />,
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

  const onSaveOrEdit: IOnSaveAndEditRows<UserEntity> = async (row, table, values, validation): Promise<void> => {

  };

  const onSubmit = (values: { [x: string]: any }) => {
    setOptionsQuery({
      typeMutation: values.userId ? 'put' : 'post'
    });
    onTransaction(values);
  };

  const onTransaction = (values: { [x: string]: any }) => {
    const title = !values.userId ? 'Saving Unit Measure!' : 'Updating Unit Measure!';
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
    const title = values.isActive ? 'Desactive Type Currency!' : 'Active Type Currency!';
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
      <MaterialTable<UserEntity>
        columns={columns}
        data={paginateData || []}
        enableRowActions
        columnsVisible={{ userId: false, username: false }}
        setRef={setRef}
        pagination={pagination}
        rowCount={rowCount}
        onPaginationChange={setPagination}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        onActionEdit={onSaveOrEdit}
        onActionSave={onSaveOrEdit}
        isLoading={isLoading}
        // onActionStateChange={(row) => onChangeState(row.original)}
        isGenerate={isGenerate}
        isError={isError}
        onActionRefreshTable={() => refetch()}       
      />
      {isMobile && <ButtonActions title="New" onClick={() => { setIsOpen(true); setEdit(null); }} />}
      {/* <UsersModal isOpen={isOpen} setIsOpen={setIsOpen} onSubmit={onSubmit} isLoading={mutation.isPending} edit={edit} /> */}
    </Paper>
  );
};

export default UnitMeasurePage;
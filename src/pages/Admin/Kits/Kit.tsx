import React from 'react';
import type { MRT_ColumnDef, MRT_TableInstance } from 'material-react-table';
import { Paper } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { IOptionsQuery, IOnSaveAndEditRows } from '@wms/interfaces';
import { useAlertNotification, useUI, useKit } from '@wms/hooks';
import { MaterialTable, ButtonActions } from '@wms/components';
import { KitEntity } from '@wms/entities';

const KitPage = () => {
  const { swalToastError, swalToastWait, swalToastSuccess } = useAlertNotification();
  const { isMobile } = useUI();
  const navigate = useNavigate();
  const [optionsQuery, setOptionsQuery] = React.useState<IOptionsQuery>({});
  const [ref, setRef] = React.useState<MRT_TableInstance<KitEntity>>();
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [globalFilter, setGlobalFilter] = React.useState('');
  const { isGenerate, rowCount, useKitListQuery, useKitMutation } = useKit();
  const { data, isLoading, isError, refetch } = useKitListQuery({ ...pagination, filter: globalFilter });
  const mutation = useKitMutation({ ...pagination, filter: globalFilter }, optionsQuery);

  const columns = React.useMemo<MRT_ColumnDef<KitEntity>[]>(() => [
    {
      id: 'kitId',
      accessorKey: 'kitId',
      header: 'Kit ID',
      enableEditing: false,
      minSize: 150,
    },
    {
      id: 'description',
      accessorKey: 'description',
      header: 'Descripcion',
      minSize: 150,
    },
    {
      id: 'category',
      accessorKey: 'category',
      accessorFn: (row) => row.category?.description,
      header: 'Categoria',
      minSize: 150,
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

  const onSaveOrEdit: IOnSaveAndEditRows<KitEntity> = async (row, table, values, validation): Promise<void> => {
    navigate(`${row.original.kitId}/edit`, { replace: false });
  };


  const onChangeState = async (values: { [key: string]: any }) => {
    setOptionsQuery({ typeMutation: 'delete'});
    const title = values.isActive ? 'Desactive Kit!' : 'Active Kit!';
    swalToastWait(title, {
      message: 'Please wait a few minutes',
      showLoading: true,
    });
    mutation.mutateAsync(values)
      .then(() => {
        swalToastSuccess('Finished', { showConfirmButton: false, timer: 2000 });
      })
      .catch((err) => { swalToastError(err.message, { showConfirmButton: false, timer: 3000 }); });
  };

  return (
    <Paper elevation={4}>
      <MaterialTable<KitEntity>
        columns={columns}
        data={data || []}
        enableRowActions
        columnsVisible={{ kitId: false }}
        setRef={setRef}
        pagination={pagination}
        rowCount={rowCount}
        onPaginationChange={setPagination}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        isEditing={false}
        onActionEdit={onSaveOrEdit}
        onActionSave={onSaveOrEdit}
        isLoading={isLoading}
        onActionStateChange={(row) => onChangeState(row.original)}
        isGenerate={isGenerate}
        isError={isError}
        onActionRefreshTable={() => refetch()}       
      />
      <ButtonActions title="New" onClick={() => { navigate('new', { replace: false }); }} />
    </Paper>
  );
};

export default KitPage;
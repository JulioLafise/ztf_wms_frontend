import React from 'react';
import type { MRT_ColumnDef, MRT_TableInstance } from 'material-react-table';
import { Box, IconButton, Paper, Tooltip } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank, MoreHoriz } from '@mui/icons-material';
import { useCountry } from '@wms/hooks';
import { MaterialTable } from '@wms/components';
import { CountryEntity } from '@wms/entities';
import CountryDetailModal from './CountryDetailModal';

const CountryPage = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [countryId, setCountryId] = React.useState<number>(1);
  const [countryName, setCountryName] = React.useState<string>('');
  const [ref, setRef] = React.useState<MRT_TableInstance<CountryEntity>>();
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [globalFilter, setGlobalFilter] = React.useState('');
  const { isGenerate, rowCount, useCountryListQuery } = useCountry();
  const { data, isLoading, isError, refetch } = useCountryListQuery({ ...pagination, filter: globalFilter });

  const columns = React.useMemo<MRT_ColumnDef<CountryEntity>[]>(() => [
    {
      id: 'countryId',
      accessorKey: 'countryId',
      header: 'Pais',
      minSize: 150,
    },
    {
      id: 'description',
      accessorKey: 'description',
      header: 'Descripcion',
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

  const getDepartaments = (id?: number, name?: string) => {
    if (id && name) {
      setCountryId(id);
      setCountryName(name);
      setIsOpen(true);
    }
  };

  return (
    <Paper elevation={4}>
      <MaterialTable<CountryEntity>
        columns={columns}
        data={data || []}
        enableRowActions
        CustomActions={({ row }) => (
          <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Tooltip title="Detail">
              <IconButton
                sx={{
                  padding: 0
                }}
                onClick={() => getDepartaments(row.original.countryId, row.original.description)}
              >
                <MoreHoriz />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        columnsVisible={{ countryId: false }}
        setRef={setRef}
        pagination={pagination}
        rowCount={rowCount}
        onPaginationChange={setPagination}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        isLoading={isLoading}
        isGenerate={isGenerate}
        isError={isError}
        onActionRefreshTable={() => refetch()}       
      />
      <CountryDetailModal isOpen={isOpen} setIsOpen={setIsOpen} countryName={countryName} countryId={countryId} />
    </Paper>
  );
};

export default CountryPage;
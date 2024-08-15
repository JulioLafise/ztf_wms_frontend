import React from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_RowData,
  type MRT_Row,
  type MRT_TableInstance,
  type MRT_Cell,
  type MRT_GroupingState
} from 'material-react-table';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Validator } from '@wms/helpers';
import { IValidationErrors, IOnSaveAndEditRows, IValidationRows } from '@wms/interfaces';
import ActionComponent from './ActionComponent';
import ActionToolbarComponent from './ActionToolbarComponent';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import './material-table.css';

interface IProps<T extends MRT_RowData> {
  columns: MRT_ColumnDef<T>[],
  data: T[],
  setRef?: React.Dispatch<React.SetStateAction<MRT_TableInstance<T> | undefined>>
  columnsVisible?: Partial<IColumnsVisible<T>>,
  groupedColumns?: Array<keyof T>,
  pagination?: IPagination,
  rowCount?: number,
  onPaginationChange?: React.Dispatch<React.SetStateAction<IPagination>>,
  enableRowActions?: boolean,
  onActionEdit?: IOnSaveAndEditRows<T>,
  onActionSave?: IOnSaveAndEditRows<T>,
  onActionDelete?: (row: MRT_Row<T>) => Promise<void>,
  onActionStateChange?: (row: MRT_Row<T>) => Promise<void>,
  onActionChangePassword?: (row: MRT_Row<T>) => Promise<void>,
  onActionExportToPDF?: (row: MRT_Row<T>) => Promise<void>,
  CustomActions?: ({ row, table }: ICustomActionsProps<T>) => JSX.Element,
  AddCustomActions?: ({ row, table }: ICustomActionsProps<T>) => JSX.Element,
  enableRowSelection?: boolean,
  isEditing?: boolean,
  isError?: boolean,
  isLoading?: boolean,
  isGenerate?: boolean,
  globalFilter?: string,
  onGlobalFilterChange?: React.Dispatch<React.SetStateAction<string>>,
  fileNameExport?: string,
  setValidationErrors?: React.Dispatch<React.SetStateAction<IValidationErrors<object>>>,
  onEditingRowChange?: (state: { cell: MRT_Cell<T, unknown>, row: MRT_Row<T>, staticRowIndex?: number | undefined, table: MRT_TableInstance<T> }) => void,
  onActionRefreshTable?: (table: MRT_TableInstance<T>) => void,
  onActionPickPicture?: (row: MRT_Row<T>, file: File) => Promise<void>,
}

interface ICustomActionsProps<T extends MRT_RowData> {
  row: MRT_Row<T>,
  table: MRT_TableInstance<T>,
}

type IColumnsVisible<T> = { [X in keyof T]: boolean };
type IPagination = { pageIndex: number, pageSize: number };

const MaterialTable = <T extends MRT_RowData,>(props: IProps<T>) => {
  const {
    columns,
    data,
    enableRowActions = false,
    enableRowSelection = false,
    columnsVisible = {},
    groupedColumns,
    pagination,
    rowCount,
    onPaginationChange,
    setRef,
    isEditing = false,
    isError,
    isLoading,
    isGenerate,
    onActionEdit,
    onActionSave,
    onActionStateChange,
    onActionDelete,
    onActionChangePassword,
    onActionExportToPDF,
    CustomActions,
    AddCustomActions,
    globalFilter,
    onGlobalFilterChange,
    fileNameExport,
    setValidationErrors,
    onEditingRowChange,
    onActionRefreshTable,
    onActionPickPicture
  } = props;
  
  const csvConfig = mkConfig({
    filename: fileNameExport ?? 'file_' + new Date().toISOString(),
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
  });

  const onActionExportTable = () => {
    let dataConvert: T[] = [];
    for (const item of data) {
      let element: T = undefined;
      Object.entries(item).forEach(obj => {
        let contentStr = '';
        if (typeof obj[1] === 'object') {
          contentStr = JSON.stringify(obj[1]).replace(/"/g,'').replace('{','').replace('}','');
        } else {
          contentStr = obj[1];
        }
        element = {
          ...element,
          [obj[0]]: contentStr
        };
      });
      dataConvert = [
        ...dataConvert,
        element
      ];
    }
    const csv = generateCsv(csvConfig)(dataConvert);
    download(csvConfig)(csv);
  };

  const onValidator: IValidationRows<T> = (validationValues?: object) => (table, isEdit) => {
    if (Validator.isObjectEmpty(validationValues)) {
      if (isEdit) {
        table.setEditingRow(null);
      } else { table.setCreatingRow(null); }
    }
  };

  const onClearErrorsRow = () => setValidationErrors && setValidationErrors({});

  const table = useMaterialReactTable({
    columns,
    data,
    getRowId: (row) => row.id,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    manualFiltering: false,
    manualSorting: false,
    createDisplayMode: 'row', // ('modal', and 'custom' are also available)
    editDisplayMode: 'row', // ('modal', 'cell', 'table', and 'custom' are also available)
    enableEditing: isEditing,
    onCreatingRowSave: ({ values, row, table }) => { onActionSave!(row, table, values, onValidator); },
    onEditingRowSave: ({ values, row, table }) => { onActionEdit!(row, table, values, onValidator); },
    onCreatingRowCancel: ({ table }) => { table.setCreatingRow(null); onClearErrorsRow(); },
    onEditingRowCancel: ({ table }) => { table.setEditingRow(null); onClearErrorsRow(); },
    enableRowActions: enableRowActions,
    enableRowSelection: enableRowSelection,
    enableFullScreenToggle: false,
    muiToolbarAlertBannerProps: isError ? { color: 'error', children: 'Error loading data' } : undefined,
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: false,
      expanded: true,
      grouping: groupedColumns as MRT_GroupingState,
      columnPinning: {
        left: ['mrt-row-expand', 'mrt-row-select', 'mrt-row-actions'],
        // right: ['mrt-row-actions'],
      },
      columnVisibility: { ...columnsVisible },
      // pagination: { pageIndex: 0, pageSize: 10 },
      density: 'compact'
    },
    rowCount,
    state: {
      pagination,
      globalFilter,
      isLoading,
      showAlertBanner: isError,
      showProgressBars: !isGenerate,
      showSkeletons: !isGenerate,
    },
    manualPagination: true,
    enableGlobalFilter: true,
    // globalFilterFn: 'contains',
    // enableGlobalFilterModes: [''],
    // onEditingCellChange: (cell) => { console.log(cell); return cell; },
    // onEditingRowChange: (row) => { console.log(row); return row; },
    onPaginationChange,
    onGlobalFilterChange,
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    muiSearchTextFieldProps: {
      size: 'small',
      variant: 'outlined',
    },
    muiPaginationProps: {
      color: 'secondary',
      rowsPerPageOptions: [5, 10, 25, 50, 100],
      shape: 'rounded',
      variant: 'outlined',
      showRowsPerPage: true,
    },
    muiTableContainerProps: {
      sx: {
        // maxHeight: '550px',
        // minHeight: '550px'
        maxHeight: '55vh',
        minHeight: '55vh'
      }
    },
    muiColumnActionsButtonProps: {
      sx: {
        maxWidth: '10px'
      },
    },
    muiTableHeadCellProps: {
      sx: {
        fontSize: '1rem',
        fontWeight: 'bold',
      }
    },
    renderRowActions: ({ row, table, cell, staticRowIndex }) => (
      CustomActions 
        ? <CustomActions row={row} table={table}/>
        : <ActionComponent
          row={row}
          cell={cell}
          staticRowIndex={staticRowIndex}
          table={table}
          isEditing={isEditing}
          onActionEdit={onActionEdit}
          onActionChangePassword={onActionChangePassword}
          onActionDelete={onActionDelete}
          onActionExportToPDF={onActionExportToPDF}
          onActionStateChange={onActionStateChange}
          onEditingRowChange={onEditingRowChange}
          onActionPickPicture={onActionPickPicture}
          AddCustomActions={AddCustomActions}
        />
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <ActionToolbarComponent table={table} onActionExportTable={onActionExportTable} onActionRefreshTable={onActionRefreshTable} isEditing={isEditing} />
    )
  });
  
  React.useEffect(() => {
    setRef && setRef(table);
  }, [table]);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <MaterialReactTable table={table} />
    </LocalizationProvider>
  );
};

export default MaterialTable;
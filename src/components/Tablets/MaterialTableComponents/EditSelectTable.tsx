import React from 'react';
import type {
  MRT_Cell,
  MRT_Row,
  MRT_Column,
  MRT_TableInstance,
  MRT_RowData,
  DropdownOption
} from 'material-react-table';
import { 
  Autocomplete,
  Box,
  TextField
} from '@mui/material';

interface IProps<T extends MRT_RowData> {
  cell: MRT_Cell<T, unknown>;
  column: MRT_Column<T, unknown>;
  row: MRT_Row<T>;
  table: MRT_TableInstance<T>;
  setSelectState?: React.Dispatch<React.SetStateAction<T>>,
  options: DropdownOption[],
  getOptionLabel: (option: DropdownOption) => string,
  width?: React.CSSProperties['width']
}

type TypeSelectOption = { label?: string, value: any, text?: string };

const EditSelectTable = React.memo(<T extends MRT_RowData>(props: IProps<T>) => {
  const {
    cell,
    column,
    table,
    row,
    setSelectState,
    options,
    getOptionLabel,
    width = 100
  } = props;
  const filter: any = cell.getValue<any>() ? options.filter((ft: any) => ft.value === cell.getValue<any>())[0] : undefined;
  const [isSelect, setIsSelect] = React.useState<TypeSelectOption | null>(null);

  React.useEffect(() => {
    if (cell.getValue<any>()) {
      setIsSelect({ value: cell.getValue<any>(), label: filter && filter.label });
      setSelectState && setSelectState(oldData => ({
        ...oldData,
        [cell.column.id]: cell.getValue<any>()
      }));
    }
  }, []);
  return (
    <Box component="section" className="flex items-center justify-center pb-1 ps-1">
      <Autocomplete
        id={column.id}
        fullWidth
        size="medium"
        sx={{ width: width }}
        isOptionEqualToValue={(option: any) => option.value === isSelect?.value}
        options={options || []}
        value={isSelect}
        getOptionLabel={getOptionLabel}
        noOptionsText="Options not available"
        onChange={(_e, value: TypeSelectOption | null) => {          
          const lastValue = value && typeof value === 'object' ? value.value : value;
          const obj: any = options.filter((ft: any) => ft.value === lastValue)[0];
          setIsSelect(obj || null);
          setSelectState && setSelectState(oldData => ({
            ...oldData,
            [cell.column.id]: lastValue
          }));
        }}
        renderInput={(textProps) => <TextField {...textProps} fullWidth margin="none" variant="standard" />}
      />
    </Box>
  );
});

export default EditSelectTable;
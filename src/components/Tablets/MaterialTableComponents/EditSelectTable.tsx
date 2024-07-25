/* eslint-disable @typescript-eslint/ban-ts-comment */
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
  AutocompleteOwnerState,
  AutocompleteRenderOptionState,
  Box,
  TextField,
  InputAdornment
} from '@mui/material';
import { FontAwesomeIcon } from '@wms/components';

interface RenderOptionProps<T> extends React.HTMLAttributes<T> {
  key?: any
}

interface IProps<T extends MRT_RowData> {
  cell: MRT_Cell<T, unknown>;
  column: MRT_Column<T, unknown>;
  row: MRT_Row<T>;
  table: MRT_TableInstance<T>;
  setSelectState?: React.Dispatch<React.SetStateAction<T>>,
  options: DropdownOption[],
  getOptionLabel: (option: DropdownOption) => string,
  renderOption?: (props: RenderOptionProps<HTMLLIElement>, option: T, state: AutocompleteRenderOptionState, ownerState: AutocompleteOwnerState<T, false, boolean, false, 'div'>) => React.ReactNode,
  width?: React.CSSProperties['width'],
  startIcon?: { icon: string, color: React.CSSProperties['color'] },
  endIcon?: { icon: string, color: React.CSSProperties['color'] },
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
    renderOption,
    width = 100,
    startIcon,
    endIcon
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
    <Box component="section" className="flex items-center justify-start pb-1 ps-1">
      <Autocomplete<T>
        id={column.id}
        fullWidth
        size="medium"
        sx={{ width: width }}
        isOptionEqualToValue={(option: any) => option.value === isSelect?.value}
        options={options as any || []}
        // @ts-expect-error
        value={isSelect}
        // @ts-expect-error
        getOptionLabel={getOptionLabel}
        renderOption={renderOption}
        noOptionsText="Options not available"
        // @ts-expect-error
        onChange={(_e, value: TypeSelectOption | null) => {          
          const lastValue = value && typeof value === 'object' ? value.value : value;
          const obj: any = options.filter((ft: any) => ft.value === lastValue)[0];
          setIsSelect(obj || null);
          setSelectState && setSelectState(oldData => ({
            ...oldData,
            [cell.column.id]: lastValue
          }));
        }}
        renderInput={(textProps) => <TextField
          {...textProps}
          fullWidth
          margin="none"
          variant="standard"
          InputProps={{
            ...textProps.InputProps,
            startAdornment: startIcon && (<InputAdornment position="start" className="pl-2">
              <FontAwesomeIcon
                color={startIcon?.color || isSelect?.value}
                iconLabel={startIcon?.icon}
              />
            </InputAdornment>),
            endAdornment: endIcon ? (<InputAdornment position="end" className="pr-8">
              <FontAwesomeIcon
                color={endIcon?.color || isSelect?.value}
                iconLabel={endIcon?.icon}
              />
            </InputAdornment>)
              : (<React.Fragment>{textProps.InputProps.endAdornment}</React.Fragment>),
          }}
        />}
      />
    </Box>
  );
});

export default EditSelectTable;
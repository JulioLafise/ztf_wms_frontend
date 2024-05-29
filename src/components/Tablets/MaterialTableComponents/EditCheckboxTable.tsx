import React from 'react';
import type {
  MRT_Cell,
  MRT_Row,
  MRT_Column,
  MRT_TableInstance,
  MRT_RowData
} from 'material-react-table';
import { Checkbox, FormControlLabel } from '@mui/material';

interface IProps<T extends MRT_RowData> {
  cell: MRT_Cell<T, unknown>;
  column: MRT_Column<T, unknown>;
  row: MRT_Row<T>;
  table: MRT_TableInstance<T>;
  setCheckState?: React.Dispatch<React.SetStateAction<T>>,
  defaultValue?: boolean
}

const EditCheckboxTable = <T extends MRT_RowData>(props: IProps<T>) => {
  const { cell, column, table, row, setCheckState, defaultValue } = props;
  const [isChecked, setIsChecked] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (cell.getValue<boolean>()) {
      setIsChecked(cell.getValue<boolean>());
      setCheckState && setCheckState(oldData => ({
        ...oldData,
        [cell.column.id]: cell.getValue<boolean>()
      }));
    } else {
      if (defaultValue != undefined) {
        setIsChecked(defaultValue);
        setCheckState && setCheckState(oldData => ({
          ...oldData,
          [cell.column.id]: defaultValue
        }));
      }
    }
  }, []);

  return (
    <>
      <FormControlLabel
        label=""
        name={cell.column.id}
        control={
          <Checkbox
            name={column.id}
            checked={isChecked}
            value={isChecked}
            onChange={(_e, checked) => {
              setIsChecked(checked);
              setCheckState && setCheckState(oldData => ({
                ...oldData,
                [cell.column.id]: checked
              }));
            }}
          />
        }
      />
    </>
  );
};

export default EditCheckboxTable;
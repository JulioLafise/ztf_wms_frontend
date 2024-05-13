import type {
  DropdownOption,
  MRT_TableInstance,
  MRT_Row,
  MRT_RowData
} from 'material-react-table';

export type FilesContent = Array<{ files: File, content: string }>;

export type ComboBoxSelectTable<T> = { [x in keyof T]: DropdownOption[] };

export type IValidationRows<T extends MRT_RowData> = (validationValues?: object) => (table: MRT_TableInstance<T>, isEdit: boolean) => void

export type IOnSaveAndEditRows<T extends MRT_RowData> = (row: MRT_Row<T>, table: MRT_TableInstance<T>, values?: T | any, validation?: IValidationRows<T>) => Promise<void>;

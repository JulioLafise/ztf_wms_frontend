import {
  type MRT_RowData,
  type MRT_Row,
  type MRT_TableInstance,
  type MRT_Cell
} from 'material-react-table';
import {
  Box,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  CheckBox,
  CheckBoxOutlineBlank,
  Delete,
  Edit,
  PictureAsPdf,
  LockResetRounded,
  AddPhotoAlternate,
  DoneAll,
  DoDisturbOn
} from '@mui/icons-material';
import { useAlertNotification } from '@wms/hooks';

interface IActionComponentProps<T extends MRT_RowData> {
  row: MRT_Row<T>,
  cell: MRT_Cell<T, unknown>,
  staticRowIndex?: number | undefined,
  table: MRT_TableInstance<T>,
  isEditing: boolean,
  onActionEdit?: (row: MRT_Row<T>, table: MRT_TableInstance<T>, values?: undefined) => Promise<void>,
  onActionDelete?: (row: MRT_Row<T>) => Promise<void>,
  onActionStateChange?: (row: MRT_Row<T>) => Promise<void>,
  onActionChangePassword?: (row: MRT_Row<T>) => Promise<void>,
  onActionExportToPDF?: (row: MRT_Row<T>) => Promise<void>,
  onEditingRowChange?: (state: { cell: MRT_Cell<T, unknown>, row: MRT_Row<T>, staticRowIndex?: number | undefined, table: MRT_TableInstance<T> }) => void,
  onActionPickPicture?: (row: MRT_Row<T>, file: File) => Promise<void>,
}

const ActionComponent = <T extends MRT_RowData,>({
  row,
  cell,
  staticRowIndex,
  table,
  isEditing,
  onActionEdit,
  onActionStateChange,
  onActionDelete,
  onActionChangePassword,
  onActionExportToPDF,
  onEditingRowChange,
  onActionPickPicture
}: IActionComponentProps<T>) => {
  const { swalToastWait, swalToastQuestion, swalToastInfo } = useAlertNotification();
  return (
    <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
      <Tooltip title="Edit">
        <IconButton
          sx={{
            padding: 0
          }}
          onClick={() => {
            isEditing && table.setEditingRow(row);
            !isEditing && onActionEdit!(row, table);
            onEditingRowChange && onEditingRowChange({ row, table, cell, staticRowIndex });
          }}
        >
          <Edit />
        </IconButton>
      </Tooltip>
      {
        onActionDelete && (
          <Tooltip title="Eliminate">
            <IconButton sx={{
              padding: 0
            }} color="error" onClick={() => {
              swalToastQuestion('Elimination',{
                message: 'Are you sure to elimination?',
                showConfirmButton: true,
                confirmButtonText: 'Ok',
                showCancelButton: true,
                cancelButtonText: 'Cancel'
              }).then(result => {
                if (result.isConfirmed) {
                  swalToastWait('Elimination!', {
                    message: 'Please wait a few minutes',
                    showLoading: true,
                  });
                  onActionDelete(row);
                }
              });            
            }}>
              <Delete />
            </IconButton>
          </Tooltip>
        )
      }
      {
        onActionStateChange && (
          <Tooltip title={`${row.original.isActive ? 'Inactive' : 'Active'}`}>
            <IconButton sx={{
              padding: 0
            }} onClick={() => {
              swalToastQuestion(`${row.original.isActive ? 'Desactivation' : 'Activation'}`,{
                message: `Are you sure to ${row.original.isActive ? 'desactivation' : 'activation'}?`,
                showConfirmButton: true,
                confirmButtonText: 'Ok',
                showCancelButton: true,
                cancelButtonText: 'Cancel'
              }).then(result => {
                if (result.isConfirmed) {
                  swalToastWait(`${row.original.isActive ? 'Desactivation' : 'Activation'}!`, {
                    message: 'Please wait a few minutes',
                    showLoading: true,
                  });
                  onActionStateChange(row);
                }
              });              
            }}>
              {row.original.isActive ? <DoDisturbOn color="error" /> : <DoneAll color="success" />}
            </IconButton>
          </Tooltip>
        )
      }
      {
        onActionChangePassword && (
          <Tooltip title="Reset Password">
            <IconButton sx={{
              padding: 0
            }} onClick={() => {
              swalToastQuestion('Reset Password',{
                message: 'Are you sure to reset the password?',
                showConfirmButton: true,
                confirmButtonText: 'Ok',
                showCancelButton: true,
                cancelButtonText: 'Cancel'
              }).then(result => {
                if (result.isConfirmed) {
                  swalToastWait('Reset Password User!', {
                    message: 'Please wait a few minutes',
                    showLoading: true,
                  });
                  onActionChangePassword(row);
                }
              });              
            }}>
              <LockResetRounded />
            </IconButton>
          </Tooltip>
        )
      }
      {
        onActionExportToPDF && (
          <Tooltip title="Export Data">
            <IconButton sx={{
              padding: 0
            }} onClick={() => {
              swalToastQuestion('Export File',{
                message: 'Are you sure to export file',
                showConfirmButton: true,
                confirmButtonText: 'Ok',
                showCancelButton: true,
                cancelButtonText: 'Cancel'
              }).then(result => {
                if (result.isConfirmed) {
                  swalToastWait('Export File!', {
                    message: 'Please wait a few minutes',
                    showLoading: true,
                  });
                  onActionExportToPDF(row);
                }
              });              
            }}>
              <PictureAsPdf />
            </IconButton>
          </Tooltip>
        )
      }
      {
        onActionPickPicture && (
          <Tooltip title="Pick Picture">
            <IconButton sx={{
              padding: 0
            }} onClick={() => {
              swalToastInfo('Pick Picture',{
                message: 'Select the image to upload',
                input: 'file',
                showConfirmButton: true,
                confirmButtonText: 'Ok',
                showCancelButton: true,
                cancelButtonText: 'Cancel'
              }).then(result => {
                if (result.isConfirmed) {
                  swalToastWait('Upload Picture!', {
                    message: 'Please wait a few minutes',
                    showLoading: true,
                  });
                  onActionPickPicture(row, result.value as File);
                }
              });              
            }}>
              <AddPhotoAlternate />
            </IconButton>
          </Tooltip>
        )
      }
    </Box>
  );
};

export default ActionComponent;
/* eslint-disable indent */
import {
  type MRT_RowData,
  type MRT_Row,
  type MRT_TableInstance,
} from 'material-react-table';
import { Box, IconButton, Tooltip } from '@mui/material';
import { FileDownload, Add, RefreshRounded } from '@mui/icons-material';

interface IActionToolbarComponentProps<T extends MRT_RowData> {
  table: MRT_TableInstance<T>,
  onActionExportTable?: () => void,
  onActionRefreshTable?: (table: MRT_TableInstance<T>) => void,
  isEditing: boolean
}


const ActionToolbarComponent = <T extends MRT_RowData,>({
  table,
  onActionExportTable,
  onActionRefreshTable,
  isEditing
}: IActionToolbarComponentProps<T>) => (
  <Box
    sx={{
      display: 'flex',
      gap: '14px',
      padding: '4px',
      flexWrap: 'wrap',
    }}
  >
    <Tooltip title="Export">
      <IconButton
        size="small"
        disabled={table.getRow.length === 0}
        onClick={onActionExportTable}
      >
        <FileDownload />
      </IconButton>
    </Tooltip>
    {
      isEditing && <Tooltip title="Add">
        <IconButton
          size="small"
          disabled={table.getRow.length === 0}
          onClick={() => table.setCreatingRow(true)}
        >
          <Add />
        </IconButton>
      </Tooltip>
    }
    {
      onActionRefreshTable && <Tooltip title="Refresh">
        <IconButton
          size="small"
          disabled={table.getRow.length === 0}
          onClick={() => onActionRefreshTable(table)}
        >
          <RefreshRounded />
        </IconButton>
      </Tooltip>
    }
  </Box>
);

export default ActionToolbarComponent;
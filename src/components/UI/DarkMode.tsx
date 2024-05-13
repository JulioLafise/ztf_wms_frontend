
import { IconButton, Tooltip } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useUI } from '@wms/hooks';

const DarkModeComponent = () => {
  const { theme, onDarkMode } = useUI();
  return (
    <Tooltip title="Dark Mode">
      <IconButton onClick={() => onDarkMode(!theme.isDarkMode)}>
        {theme.isDarkMode ? <DarkMode /> : <LightMode sx={{ color: 'white' }} />}
      </IconButton>
    </Tooltip>
  );
};

export default DarkModeComponent;
import React from 'react';
import {
  Box,
  ClickAwayListener,
  Grow,
  IconButton,
  Paper,
  Popper,
  Tooltip
} from '@mui/material';
import { ColorLens } from '@mui/icons-material';
import { PaletteTheme } from '@wms/interfaces';
import { paletteColors } from '@wms/static';
import { LocalStorageConfig } from '@wms/config';
import { useUI } from '@wms/hooks';
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '../';

const PopperButton: React.FC<{
  children: React.ReactElement,
  anchorRef: React.RefObject<HTMLButtonElement>,
  open: boolean,
  onClose: (_event: Event | React.SyntheticEvent) => void
}> = (props) => {
  const {
    children,
    anchorRef,
    open,
    onClose
  } = props;
  return (
    <Popper
      open={open}
      anchorEl={anchorRef.current}
      role={undefined}
      placement="bottom"
      transition
      disablePortal
      sx={{ zIndex: 5 }}
      modifiers={[
        {
          name: 'arrow',
          enabled: true,
          options: {
            element: anchorRef.current,
          },
        },
      ]}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === 'bottom' ? 'left top' : 'left bottom',
          }}
        >
          <Box>
            <ClickAwayListener onClickAway={onClose}>
              {children}
            </ClickAwayListener>
          </Box>
        </Grow>
      )}
    </Popper>
  );
};

const UIThemePicker = () => {
  const [theme, setTheme] = React.useState<PaletteTheme['paletteColors']>(LocalStorageConfig.getItem('theme', 'string', 'olpc-green-theme'));
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const { changePaletteColors } = useUI();
  const themes = React.useMemo(() => {
    const colors: PaletteTheme['paletteColors'][] = [
      'olpc-green-theme',
      'olpc-blue-theme',
      'olpc-gray-theme',
      'olpc-orange-theme',
      'olpc-pink-theme'
    ];
    return colors;
  }, []);

  const onClick = (value: PaletteTheme['paletteColors']) => (_event: any) => {
    setTheme(value);
    changePaletteColors(value);
  };

  const getColor = (value: PaletteTheme['paletteColors']) => paletteColors(value)?.primary.main;

  const onClose = (_event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains((_event.target as HTMLElement))
    ) {
      return;
    }
    setOpen(false);
  };

  const onToggle = () => setOpen((prevOpen) => !prevOpen);

  const onListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  };
  return (
    <React.Fragment>
      <Tooltip title="Themes">
        <IconButton
          size="large"
          aria-label="themes"
          color="inherit"
          id="themes-menu"
          aria-controls={open ? 'themes-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          ref={anchorRef}
          onClick={onToggle}
        >
          <ColorLens />
        </IconButton>
      </Tooltip>
      <PopperButton anchorRef={anchorRef} onClose={onClose} open={open}>
        <Paper elevation={2}>
          <Box component="section" className="flex flex-nowrap items-center gap-2 p-2">
            {
              themes.map(values =>
                <Box
                  key={uuid()}
                  component="article"
                  className={`rounded-full p-0.5 ${values === theme ? 'border-2 border-solid border-white shadow-lg' : 'shadow-md'}`}
                  bgcolor={getColor(values)}
                  onKeyDown={onListKeyDown}
                >
                  <IconButton
                    onClick={onClick(values)}
                  >
                    <FontAwesomeIcon iconLabel="palette" size="xs" />
                  </IconButton>
                </Box>
              )
            }
          </Box>
        </Paper>
      </PopperButton>
    </React.Fragment>
  );
};

export default UIThemePicker;
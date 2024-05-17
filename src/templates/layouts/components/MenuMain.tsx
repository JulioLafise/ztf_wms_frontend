import React from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  Divider,
  Tooltip,
  CssBaseline,
} from '@mui/material';
import { v4 as uuid } from 'uuid';
import { IMenuList } from '@wms/interfaces';
import { FontAwesomeIcon } from '@wms/components';


interface IMenuMainProps {
  toggleDrawer: (anchor: Anchor, open: boolean, menu: IMenuList, navUrl: string) => (event: React.KeyboardEvent | React.MouseEvent) => void
  menuMain: IMenuList,
}

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const MenuMain = (props: IMenuMainProps) => {
  const { menuMain, toggleDrawer } = props;
  return (
    <React.Fragment key={uuid()}>
      <CssBaseline />
      <ListItem key={uuid()} disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: 'center',
            px: 2.5,
          }}
          onClick={toggleDrawer('left', true, menuMain, '')}
        >
          <Tooltip title={menuMain.menuName} placement="right">
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 'auto',
                justifyContent: 'center',
              }}
            >
              <FontAwesomeIcon iconLabel={menuMain.icon} size="lg" />
            </ListItemIcon>
          </Tooltip>
        </ListItemButton>
      </ListItem>
      {menuMain.menuId === 'dashboard' && <Divider />}
    </React.Fragment>
  );
};

export default MenuMain;
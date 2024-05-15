import React from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  Divider,
  Tooltip,
  SwipeableDrawer,
  CssBaseline,
  useTheme
} from '@mui/material';
import { v4 as uuid } from 'uuid';
import { IMenuList } from '@wms/interfaces';
import { FontAwesomeIcon } from '@wms/components';
// import MenuList from './MenuList';


interface IMenuMainProps {
  toggleDrawer: (anchor: Anchor, open: boolean, menu: string) => (event: React.KeyboardEvent | React.MouseEvent) => void
  menuMain: IMenuList,
  state: IStateAnchorProps
  menuSelect: string
}

interface IStateAnchorProps {
  top: boolean;
  left: boolean;
  bottom: boolean;
  right: boolean;
}

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const MenuMain = (props: IMenuMainProps) => {
  const { menuMain, toggleDrawer, state, menuSelect } = props;
  const theme = useTheme();
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
          onClick={toggleDrawer('left', true, menuMain.menuId)}
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
      {/* <SwipeableDrawer
        anchor="left"
        open={state['left']}
        onClose={toggleDrawer('left', false, '')}
        onOpen={toggleDrawer('left', true, '')}
        sx={{ display: menuSelect === menuMain.menuId ? '' : 'none' }}
        transitionDuration={{
          enter: theme.transitions.duration.enteringScreen,
          exit: theme.transitions.duration.leavingScreen
        }}
      >
        <MenuList
          key={uuid()}
          anchor="left"
          menuMain={menuMain}
          subMenu={menuMain.children!}
          toggleDrawer={toggleDrawer}
        />
      </SwipeableDrawer> */}
      {menuMain.menuId === 'dashboard' && <Divider />}
    </React.Fragment>
  );
};

export default MenuMain;
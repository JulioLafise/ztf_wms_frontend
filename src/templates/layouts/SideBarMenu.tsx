import React from 'react';
import {
  styled,
  Drawer as MuiDrawer,
  Theme,
  CSSObject,
  List,
  Divider,
  Box
} from '@mui/material';
import { v4 as uuid } from 'uuid';
import { IMenuList } from '@wms/interfaces';
import { MenuMain, MenuOthers } from './components';


// FUNCTIONS && CONST

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up(768)]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

// FUNCTIONS && CONST


// MODIFY COMPONENTS

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

// MODIFY COMPONENTS


// INTERFACES && TYPES

interface IProps {
  menu: IMenuList[],
  others: IMenuList[],
}

interface IStateAnchorProps {
  top: boolean;
  left: boolean;
  bottom: boolean;
  right: boolean;
}

type Anchor = 'top' | 'left' | 'bottom' | 'right';

// INTERFACES && TYPES 

const SideBarMenu = (props: IProps) => {
  const { menu, others } = props;
  const [menuSelect, setMenuSelect] = React.useState('');
  const [state, setState] = React.useState<IStateAnchorProps>({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean, menu: string) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setMenuSelect(menu);
      setState({ ...state, [anchor]: open });
    };
  
  const BoxSideBar = styled('div')(({ theme }) => ({
    display: 'flex',
    [theme.breakpoints.down(768)]: {
      display: 'none'
    }
  }));
    
  return (
    <BoxSideBar>
      <Drawer variant="permanent" anchor="left" open={false}>
        <DrawerHeader />
        <Divider />
        <List>
          {menu.map((item) => (
            <MenuMain menuMain={item} state={state} toggleDrawer={toggleDrawer} key={uuid()} menuSelect={menuSelect} />
          ))}
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <List>
          {others.map((item) => (
            <MenuOthers others={item} key={uuid()} />
          ))}
        </List>
      </Drawer>
    </BoxSideBar>
  );
};

export default SideBarMenu;

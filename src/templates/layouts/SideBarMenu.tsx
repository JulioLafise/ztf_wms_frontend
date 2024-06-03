import React from 'react';
import {
  styled,
  Drawer as MuiDrawer,
  Theme,
  CSSObject,
  List,
  Divider,
  Box,
  type DrawerProps
} from '@mui/material';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { IMenuList } from '@wms/interfaces';
import { MenuOthers, MenuMain } from './components';


// FUNCTIONS && CONST

const drawerWidth = 240;

const openedMixin = (theme: Theme, type: 'permanent' | 'temporary'): CSSObject => ({
  width: drawerWidth,
  boxShadow: type === 'permanent' ? undefined : '5px 10px 18px #888888',
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

interface IDrawerProps extends DrawerProps {
  type: 'permanent' | 'temporary'
}

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })<IDrawerProps>(
  ({ theme, open, type }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme, type),
      '& .MuiDrawer-paper': openedMixin(theme, type),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


// INTERFACES && TYPES

interface IProps {
  menu: IMenuList[],
  others: IMenuList[],
  open: boolean,
  typeSideBar: 'permanent' | 'temporary',
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

// INTERFACES && TYPES 

const SideBarMenu = (props: IProps) => {
  const {
    menu,
    others,
    open: openSideBar,
    typeSideBar,
    setOpen
  } = props;
  const navigate = useNavigate();
  
  const toggleDrawer = (open: boolean, navUrl: string) =>
    (event: React.KeyboardEvent | React.MouseEvent | React.TouchEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      onClose(open);
      !!navUrl && navigate(navUrl, { replace: true });
    };

  const onClose = (open: boolean) => {
    if (typeSideBar === 'permanent') {
      setOpen(true);
    } else {
      setOpen(open);
    }
  };
  
  const BoxSideBar = styled('div')(({ theme }) => ({
    display: 'flex',
    [theme.breakpoints.down(768)]: {
      display: 'none'
    }
  }));

    
  return (
    <BoxSideBar>
      <Drawer variant="permanent" anchor="left" open={openSideBar} type={typeSideBar}>
        <DrawerHeader />
        <Divider />
        <Box onMouseOver={toggleDrawer(true, '')} onMouseLeave={toggleDrawer(false, '')}>
          <List>
            {menu.map((item) => (
              <MenuMain key={uuid()} toggleDrawer={toggleDrawer} menu={item} openSideBar={openSideBar} typeSideBar={typeSideBar} />
            ))}
          </List>
        </Box>
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

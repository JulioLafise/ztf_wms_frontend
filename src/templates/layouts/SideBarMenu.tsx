import React from 'react';
import {
  styled,
  Drawer as MuiDrawer,
  Theme,
  CSSObject,
  List,
  Divider,
  Box,
  SwipeableDrawer,
  useTheme
} from '@mui/material';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { IMenuList } from '@wms/interfaces';
import { sleep } from '@wms/helpers';
import { MenuMain, MenuOthers } from './components';
import MenuList from './components/MenuList';


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
  const theme = useTheme();
  const navigate = useNavigate();
  const [menuSelect, setMenuSelect] = React.useState<IMenuList | null>(null);
  const [state, setState] = React.useState<IStateAnchorProps>({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean, menu: IMenuList | null, navUrl: string) =>
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
      !!navUrl && sleep(0.05).then(() => navigate(navUrl, { replace: true }));
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
            <MenuMain menuMain={item} toggleDrawer={toggleDrawer} key={uuid()} />
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
      <SwipeableDrawer
        anchor="left"
        open={state['left']}
        onClose={toggleDrawer('left', false, null, '')}
        onOpen={toggleDrawer('left', true, null, '')}
        transitionDuration={{
          enter: theme.transitions.duration.enteringScreen,
          exit: theme.transitions.duration.leavingScreen
        }}
      >
        {
          !!menuSelect && (
            <MenuList
              key={uuid()}
              anchor="left"
              menuMain={menuSelect}
              subMenu={menuSelect.children!}
              toggleDrawer={toggleDrawer}
            />
          )
        }
      </SwipeableDrawer>
    </BoxSideBar>
  );
};

export default SideBarMenu;

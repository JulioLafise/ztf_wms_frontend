import React from 'react';
import {
  styled,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  Box,
  Typography,
  Collapse,
  IconButton,
  Tooltip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { IMenuList } from '@wms/interfaces';
import { FontAwesomeIcon } from '@wms/components';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


interface IMenuListProps {
  anchor: Anchor,
  toggleDrawer: (anchor: Anchor, open: boolean, menu: IMenuList | null, navUrl: string) => (event: React.KeyboardEvent | React.MouseEvent) => void
  menuMain: IMenuList,
  subMenu: IMenuList[]
}

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const MenuList = (props: IMenuListProps) => {
  const { anchor, toggleDrawer, menuMain, subMenu } = props;
  const [open, setOpen] = React.useState(false);
  const onChangeState = (anchor: Anchor, open: boolean, menu: IMenuList | null, navUrl: string) => (event: React.KeyboardEvent | React.MouseEvent) => {
    setOpen(prevState => {
      toggleDrawer(anchor, open, menu, navUrl)(event);
      return open;
    });
  };
  return (
    <React.Fragment>
      <ListItem
        onClick={onChangeState('left', !open, menuMain, '')}
        className="text-end"
        sx={{ display: 'block' }}
        // secondaryAction={
        //   <IconButton edge="end" >
        //     {open ? <ExpandLess /> : <ExpandMore />}
        //   </IconButton>
        // }
      >
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: 'initial',
            px: 2.5,
          }}
        >
          <Tooltip title={menuMain.menuName} placement="right">
            <ListItemIcon><FontAwesomeIcon iconLabel={menuMain.icon} size="lg" /></ListItemIcon>
          </Tooltip>
          <ListItemText disableTypography primary={menuMain?.menuName} className="font-semibold" />
        </ListItemButton>
      </ListItem>
      {menuMain.menuId === 'dashboard' && <Divider />}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List>
          {subMenu.map((item) => (
            <ListItem key={item.menuId} disablePadding>
              <ListItemButton onClick={onChangeState(anchor, !open, null, `${menuMain.menuUrl}${item.menuUrl}`)}>
                <ListItemIcon>
                  <FontAwesomeIcon iconLabel={item.icon} size="lg" />
                </ListItemIcon>
                <ListItemText primary={item.menuName} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
};

export default MenuList;
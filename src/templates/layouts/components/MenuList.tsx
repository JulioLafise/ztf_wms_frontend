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
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { IMenuList } from '@wms/interfaces';
import { FontAwesomeIcon } from '@wms/components';

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
  return (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false, null, '')}
      // onKeyDown={toggleDrawer(anchor, false, null, '')}
    >
      <DrawerHeader />
      <Box component="section" className="flex flex-nowrap items-center py-2">
        <FontAwesomeIcon iconLabel={menuMain.icon} size="xl" className="px-5" />
        {
          <Box key={uuid()} component="section" className="flex flex-col">
            {
              menuMain.menuName.split('\n').map(text => (
                <Typography key={uuid()} variant="h5" fontWeight="bold" className="break-all">{text}</Typography>
              ))
            }
          </Box>
        }
      </Box>
      <Divider variant="middle" />
      <List>
        {subMenu.map((item) => (
          <ListItem key={item.menuId} disablePadding>
            <ListItemButton onClick={toggleDrawer(anchor, false, null, `${menuMain.menuUrl}${item.menuUrl}`)}>
              <ListItemIcon>
                <FontAwesomeIcon iconLabel={item.icon} size="lg" />
              </ListItemIcon>
              <ListItemText primary={item.menuName} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MenuList;
import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { IMenuList } from '@wms/interfaces';
import { FontAwesomeIcon } from '@wms/components';
import { NestedList } from './components';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface IProps {
  isOpen: boolean
  handleClose: () => void,
  menu: IMenuList[]
}

const SideBarMobileMenu = (props: IProps) => {
  const { isOpen, handleClose, menu } = props;
  const navigate = useNavigate();
  return (
    <Drawer
      open={isOpen}
      onClose={handleClose}
      sx={{ width: 240 }}
      anchor="left"
    >
      <DrawerHeader></DrawerHeader>
      <List>
        {
          menu.map(item => {
            if (!item.children) {
              return (
                <ListItem key={uuid()} disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: isOpen ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    onClick={() => { handleClose(); navigate(item.menuUrl, { replace: false }); }}
                  >
                    <ListItemText primary={item.menuName} />
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        ml: isOpen ? 7 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <FontAwesomeIcon iconLabel={item.icon} size="lg" className="pl-5" />
                    </ListItemIcon>                  
                  </ListItemButton>
                </ListItem>
              );
            }
            return (
              <NestedList key={uuid()} menu={item} handleClose={handleClose} />
            );
          })
        }
      </List>
    </Drawer>
  );
};

export default SideBarMobileMenu;
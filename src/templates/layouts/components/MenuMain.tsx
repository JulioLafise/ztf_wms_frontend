import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  Collapse,
  IconButton,
  Tooltip,
  ClickAwayListener
} from '@mui/material';
import { IMenuList } from '@wms/interfaces';
import { FontAwesomeIcon } from '@wms/components';
import { ExpandLess, ExpandMore } from '@mui/icons-material';


interface IMenuProps {
  toggleDrawer: (open: boolean, navUrl: string) => (event: React.KeyboardEvent | React.MouseEvent) => void
  menu: IMenuList,
  openSideBar: boolean,
  typeSideBar: 'permanent' | 'temporary',
}


const MenuMain: React.FC<IMenuProps> = (props) => {
  const { toggleDrawer, menu, openSideBar, typeSideBar } = props;
  const [open, setOpen] = React.useState(false);
  // const [open, setOpen] = React.useState(typeSideBar === 'permanent');

  // const onToggle = (ev: any) => setOpen(prevState => !prevState);
  const onToggle = (open: boolean) => (event: any) => setOpen(open);
  return (
    <React.Fragment>
      <ListItem
        // onClick={onToggle}
        onMouseOver={onToggle(true)}
        onMouseLeave={onToggle(false)}
        className="text-end"
        disablePadding
        sx={{ display: 'block' }}
        secondaryAction={
          openSideBar && (
            <IconButton edge="end" >
              {open ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          )
        }
      >
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: 'initial',
            px: 2.5,
          }}
        >
          <Tooltip title={menu.menuName} placement="right">
            <ListItemIcon><FontAwesomeIcon iconLabel={menu.icon} size="lg" /></ListItemIcon>
          </Tooltip>
          <ListItemText disableTypography primary={menu?.menuName} className="font-semibold" />
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <ClickAwayListener onClickAway={() => { }}>
          <List>
            {menu?.children?.map((item) => (
              <ListItem key={item.menuId} disablePadding onMouseOver={onToggle(true)} onMouseLeave={onToggle(false)}>
                <ListItemButton onClick={toggleDrawer(false, `${menu.menuUrl}${item.menuUrl}`)}>
                  <ListItemIcon sx={{ pl: 1 }} >
                    <FontAwesomeIcon iconLabel={item.icon} size="lg" />
                  </ListItemIcon>
                  <ListItemText primary={item.menuName} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </ClickAwayListener>
      </Collapse>
      {menu.menuId === 'dashboard' && <Divider />}
    </React.Fragment>
  );
};

export default MenuMain;
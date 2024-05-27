import React from 'react';
import { Menu as MenuUI, MenuItem, ListItemIcon } from '@mui/material';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { IMenuList } from '@wms/interfaces';
import { FontAwesomeIcon } from '@wms/components';


interface IProps {
  anchorEl: HTMLElement | null, 
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
  menuMain: IMenuList,
  subMenu: IMenuList[]
}

const Menu = (props: IProps) => {
  const { anchorEl, setAnchorEl, subMenu, menuMain } = props;
  const isMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <MenuUI
      key={uuid()}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      // keepMounted
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{ zIndex: '9998 !important', left: 55 }}
    >
      {
        subMenu.map(item => (
          <MenuItem key={uuid()} onClick={() => { handleMenuClose(); navigate(`${menuMain.menuUrl}${item.menuUrl}`, { replace: true }); }} className="text-gray-600">
            <ListItemIcon><FontAwesomeIcon iconLabel={item.icon} size="lg" className="pr-4" /></ListItemIcon>
            {item.menuName}
          </MenuItem>
        ))
      }
    </MenuUI>
  );
};

export default Menu;
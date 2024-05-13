import React from 'react';
import {
  Divider,
  ListItemIcon,
  Menu,
  MenuItem
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@wms/components';
import { useAuth, useToastNotification } from '@wms/hooks';

interface IProps {
  isMenuOpen: boolean,
  handleMenuClose: () => void,
  anchorEl: null | HTMLElement
}

const MenuProfileMobile = (props: IProps) => {
  const { handleMenuClose, isMenuOpen, anchorEl } = props;
  const navigate = useNavigate();
  const { onSignOut } = useAuth();
  const { toastInfo } = useToastNotification();
  const handleSignOut = () => onSignOut().then(() => {
    toastInfo('Finished Session', { duration: 3000, mode: 'light' });
  });
  return (
    <Menu
      id="positioned-menu"
      aria-labelledby="positioned-button"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      slotProps={{ paper: {
        elevation: 0,
        sx: {
          'overflow': 'visible',
          'filter': 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          'mt': 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
        },
      }
      }}
      sx={{ zIndex: '9999 !important' }}
    >
      <MenuItem onClick={() => { handleMenuClose(); navigate('/app/settings/profile', { replace: true }); }}>
        <ListItemIcon>
          <FontAwesomeIcon icon="key" size="lg" className="pr-4" />
        </ListItemIcon>        
        Profile
      </MenuItem>
      <Divider variant="middle" />
      <MenuItem onClick={() => { handleMenuClose(); navigate('/app/settings', { replace: true }); }}>
        <ListItemIcon>
          <FontAwesomeIcon icon="gears" size="lg" className="pr-4" />
        </ListItemIcon>
        Settings
      </MenuItem>
      <MenuItem onClick={() => { handleMenuClose(); navigate('/app/catalogue', { replace: true }); }}>
        <ListItemIcon>
          <FontAwesomeIcon icon="book" size="lg" className="pr-4" />
        </ListItemIcon>
        Catalogue
      </MenuItem>
      <Divider variant="middle" />
      <MenuItem onClick={() => { handleMenuClose(); handleSignOut(); }}>
        <ListItemIcon>
          <FontAwesomeIcon icon="sign-out" size="lg" className="pr-4" />
        </ListItemIcon>        
        Sign Out
      </MenuItem>
    </Menu>
  );
};

export default MenuProfileMobile;
import React from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { v4 as uuid } from 'uuid';
import { IMenuList } from '@wms/interfaces';
import { FontAwesomeIcon, BackgroundLetterAvatars } from '@wms/components';
import { useAuth } from '@wms/hooks';
import Menu from './Menu';

interface IMenuOthers {
  others: IMenuList
}

const MenuOthers = (props: IMenuOthers) => {
  const { others } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { user } = useAuth();
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <React.Fragment>
      <ListItem key={others.menuId} disablePadding sx={{ display: 'block' }} className="text-end" onClick={handleProfileMenuOpen}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: 'initial',
            px: 2.5,
          }}          
        >
          <Tooltip title={others.menuName} placement="right">
            <ListItemIcon>
              {
                others.menuId === 'account'
                  ? <BackgroundLetterAvatars sx={{ width: 24, height: 24, fontSize: 12 }} alt={user?.firstName} src={user?.picture} />
                  : <FontAwesomeIcon iconLabel={others.icon} size="lg" />
              }              
            </ListItemIcon>
          </Tooltip>
          <ListItemText disableTypography>{others.menuName}</ListItemText>
        </ListItemButton>
      </ListItem>
      <Menu key={uuid()} anchorEl={anchorEl} setAnchorEl={setAnchorEl} subMenu={others.children!} menuMain={others} />
    </React.Fragment>
  );
};

export default MenuOthers;
import React from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
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
    <>
      <ListItem key={others.menuId} disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: 'center',
            px: 2.5,
          }}
          onClick={handleProfileMenuOpen}
        >
          <Tooltip title={others.menuName} placement="right">
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 'auto',
                justifyContent: 'center',
              }}
            >
              {
                others.menuId === 'account'
                  ? <BackgroundLetterAvatars sx={{ width: 24, height: 24, fontSize: 12 }} alt={user?.person?.firstName} src={user?.userImage} />
                  : <FontAwesomeIcon iconLabel={others.icon} size="lg" />
              }
            </ListItemIcon>
          </Tooltip>
        </ListItemButton>
      </ListItem>
      <Menu key={uuid()} anchorEl={anchorEl} setAnchorEl={setAnchorEl} subMenu={others.children!} menuMain={others} />
    </>
  );
};

export default MenuOthers;
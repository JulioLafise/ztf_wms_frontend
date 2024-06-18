import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore
} from '@mui/icons-material';
import { v4 as uuid } from 'uuid';
import { IMenuList } from '@wms/interfaces';
import { FontAwesomeIcon } from '@wms/components';

interface INestedListProps {
  menu: IMenuList,
  handleClose: () => void,
}

const NestedList = ({ menu, handleClose }: INestedListProps) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const onToggle = (open: boolean) => (event: any) => setOpen(open);
  // const handleClick = () => setOpen(!open);
  return (
    <React.Fragment>
      <ListItem
        // onClick={handleClick}
        onMouseOver={onToggle(true)}
        onMouseLeave={onToggle(false)}
        className="text-end"
        secondaryAction={
          <IconButton edge="end" >
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        }
        // disablePadding
      >
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: 'initial',
            px: 2.5,
          }}
        >
          <ListItemIcon><FontAwesomeIcon iconLabel={menu.icon} size="lg" /></ListItemIcon>
          <ListItemText disableTypography primary={menu?.menuName} className="font-semibold" />
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            menu.children!.map(item => (
              <ListItem key={uuid()} sx={{ pl: 1 }} onClick={handleClose} className="text-end" disablePadding onMouseOver={onToggle(true)} onMouseLeave={onToggle(false)}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: 'initial',
                    px: 2.5,
                  }}
                  onClick={() => navigate(`${menu.menuUrl}${item.menuUrl}`, { replace: false })}
                >
                  <ListItemText primary={item.menuName} />
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      ml: 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <FontAwesomeIcon iconLabel={item.icon} size="lg" />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>
      </Collapse>
    </React.Fragment>
  );
};

export default NestedList;
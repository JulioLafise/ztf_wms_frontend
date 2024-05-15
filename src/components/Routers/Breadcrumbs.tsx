import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Breadcrumbs as MuiBreadcrumbs,
  Link,
  AppBar,
  Toolbar,
  useScrollTrigger,
  Box,
  IconButton,
  styled,
  Paper
} from '@mui/material';
import { v4 as uuid } from 'uuid';
import { useUI } from '@wms/hooks';
import { FontAwesomeIcon } from '@wms/components';


interface IProps {
  window?: () => Window,
  children: React.ReactElement
}
const ElevationScroll = (props: IProps) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined
  });
  return React.cloneElement(children, {
    elevation: trigger ? 0 : 0,
  });
};

const BoxOffset = styled(Box)(({ theme }) => ({
  paddingLeft: 70,
  [theme.breakpoints.down(768)]: {
    paddingLeft: 10
  }
}));

const BoxContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down(768)]: {
    display: 'none'
  }
}));


const Breadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { menu } = useUI();
  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

  const getIcon = (path: string) => {
    if (path === 'app') return 'diamond';
    let icon: string = '';
    menu.main.forEach(item => {
      let lastIndex = item.menuUrl.split('/').length - 1;
      let compare = item.menuUrl.split('/')[lastIndex];
      if (compare === path) {
        icon = item.icon;
        return;
      }
      if (item.children) {
        item.children.forEach(children => {
          lastIndex = children.menuUrl.split('/').length - 1;
          compare = children.menuUrl.split('/')[lastIndex];
          if (compare === path) {
            icon = children.icon;
            return;
          }
        });
      }
    });
    if (icon.length > 0) return icon;
    menu.secondary.forEach(item => {
      if (path === 'settings') {
        icon = 'gears';
        return;
      }
      let lastIndex = item.menuUrl.split('/').length - 1;
      let compare = item.menuUrl.split('/')[lastIndex];
      if (compare === path) {
        icon = item.icon;
        return;
      }
      if (item.children) {
        item.children.forEach(children => {
          lastIndex = children.menuUrl.split('/').length - 1;
          compare = children.menuUrl.split('/')[lastIndex];
          if (compare === path) {
            icon = children.icon;
            return;
          }
        });
      }
    });
    return icon.length > 0 ? icon : 'diamond';
  };

  const getPath = (path: string) => {
    if (path === 'app') return '/app';
    let route: string = '';
    menu.main.forEach(item => {
      let lastIndex = item.menuUrl.split('/').length - 1;
      let compare = item.menuUrl.split('/')[lastIndex];
      if (compare === path) {
        route = item.menuUrl;
        return;
      }
      if (item.children) {
        item.children.forEach(children => {
          lastIndex = children.menuUrl.split('/').length - 1;
          compare = children.menuUrl.split('/')[lastIndex];
          if (compare === path) {
            route = `${item.menuUrl}${children.menuUrl}`;
            return;
          }
        });
      }
    });
    if (route.length > 0) return route;
    menu.secondary.forEach(item => {
      let lastIndex = item.menuUrl.split('/').length - 1;
      let compare = item.menuUrl.split('/')[lastIndex];
      if (compare === path) {
        route = item.menuUrl;
        return;
      }
      if (item.children) {
        item.children.forEach(children => {
          lastIndex = children.menuUrl.split('/').length - 1;
          compare = children.menuUrl.split('/')[lastIndex];
          if (compare === path) {
            route = `${item.menuUrl}${children.menuUrl}`;
            return;
          }
        });
      }
    });
    return route;
  };

  return (
    <BoxContainer>
      <Offset />
      <ElevationScroll>
        <AppBar
          color="transparent"
          elevation={2}
          position="fixed"
          sx={{ top: 56, boxShadow: 0 }}
        >
          <Paper>
            <Toolbar >
              <BoxOffset />
              <MuiBreadcrumbs maxItems={4} aria-label="breadcrumb">
                <IconButton
                  edge="start"
                  size="medium"
                  onClick={() => navigate('/app/dashboard', { replace: true })}
                >
                  <FontAwesomeIcon icon="home" size="xs" />
                </IconButton>
                {
                  location.pathname.split('/').filter(fil => fil !== '').map(nav => (
                    <Link
                      key={uuid()}
                      underline="hover"
                      sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                      color="inherit"
                      onClick={() => navigate(getPath(nav))}
                    >
                      <FontAwesomeIcon iconLabel={getIcon(nav)} size="sm" className="mr-1" />
                      {nav}
                    </Link>
                  ))
                }
              </MuiBreadcrumbs>
            </Toolbar>
          </Paper>
        </AppBar>
      </ElevationScroll>
    </BoxContainer>
  );
};

export default Breadcrumbs;
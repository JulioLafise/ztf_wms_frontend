import React from 'react';
import {
  AppBar,
  Badge,
  Box,
  Button,
  CssBaseline,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  styled,
  useScrollTrigger
} from '@mui/material';
import {
  Mail,
  Notifications,
  LogoutRounded,
  InfoRounded,
  Menu,
  Close
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { DarkMode } from '@wms/components';
import { useAuth, useToastNotification, useUI } from '@wms/hooks';

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
    elevation: trigger ? 0 : 0
  });
};


const NavBar: React.FC<{
  setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>,
  setTypeSideBar: React.Dispatch<React.SetStateAction<'permanent' | 'temporary'>>,
  openSideBar: boolean
}> = (props) => {
  const { setOpenSideBar, setTypeSideBar, openSideBar } = props;
  const { onSignOut } = useAuth();
  const { toastInfo } = useToastNotification();
  const navigate = useNavigate();
  const { onAboutMenu } = useUI();
  const onNavHome = () => navigate('/app/dashboard', { replace: true });
  const handleSignOut = () => onSignOut().then(() => {
    toastInfo('Finished Session', { duration: 3000, mode: 'light' });
  });
  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);
  const BoxNavBar = styled('div')(({ theme }) => ({
    flexGrow: 1,
    [theme.breakpoints.down(768)]: {
      display: 'none'
    }
  }));
  const onClick = () => {
    setOpenSideBar(prevState => {
      setTypeSideBar(!prevState ? 'permanent' : 'temporary');
      return !prevState;
    });
  };
  return (
    <BoxNavBar sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <ElevationScroll>
        <AppBar position="fixed" sx={{ zIndex: '9999 !important', }} >
          <Toolbar>
            <IconButton
              color="inherit"
              size="large"
              edge="start"
              onClick={onClick}
            >
              {
                openSideBar
                  ? <Close />
                  : <Menu />
              }
            </IconButton>
            <Box component="article" className="flex items-center bg-white rounded-full py-2 px-2.5" onClick={onNavHome} >
              <img src="/img/logo_zt_foundation.png" width="24" />
            </Box>
            <Typography variant="h6" component="div" className="pl-2" fontWeight="bold" onClick={onNavHome}>
              ZTF - WMS
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: 'flex' }}>
              <Tooltip title="About">
                <IconButton
                  size="large"
                  aria-label="about alm-mis"
                  color="inherit"
                  onClick={() => onAboutMenu(true)}
                >
                  <InfoRounded />
                </IconButton>
              </Tooltip>
              <DarkMode />
              <Tooltip title="Messages">
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={4} color="error">
                    <Mail />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Notifications">
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Button
                variant="contained"
                color="warning"
                sx={{ ml: 1, py: 0 }}
                size="small"
                onClick={handleSignOut}
              >
                <LogoutRounded className="mr-1" />
                Sign Out
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Offset />
    </BoxNavBar>
  );
};

export default NavBar;
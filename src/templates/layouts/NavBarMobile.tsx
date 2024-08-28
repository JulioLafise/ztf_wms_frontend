import React from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
  styled,
  useScrollTrigger,
  useMediaQuery,
  Theme
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { BackgroundLetterAvatars, DarkMode, UIThemePicker } from '@wms/components';
import { useAuth, useUI } from '@wms/hooks';
import { IMenuList } from '@wms/interfaces';
import { enviroment } from '@wms/config';
import { MenuProfileMobile } from './components';
import SideBarMobileMenu from './SideBarMobileMenu';

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
    elevation: trigger ? 4 : 0,
  });
};

interface INavBarMobileProps {
  menu: IMenuList[]
}

const NavBarMobile = (props: INavBarMobileProps) => {
  const { menu } = props;
  const { user } = useAuth();
  const navigate = useNavigate();
  const { theme } = useUI();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down(768));
  const isMinWidth = useMediaQuery((theme: Theme) => theme.breakpoints.down(512));
  const [openMobile, setOpenMobile] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);

  const onNavHome = () => navigate('/app/dashboard', { replace: true });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleDrawer = () => setOpenMobile(oldState => !oldState);

  const handleClose = () => setOpenMobile(false);

  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

  return (
    <Box display={isMobile ? 'initial' : 'none'} sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <ElevationScroll>
        <AppBar position="fixed" sx={{ zIndex: '9999 !important' }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawer}
              edge="start"
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              component="article"
              className="flex items-center rounded-full p-2"
              onClick={onNavHome}
              bgcolor={theme.isDarkMode ? '' : 'white'}
            >
              <img src="/img/olpc_color_logotype.png" width="76" alt="olpc" />
            </Box>
            <Typography
              variant="h6"
              component="div"
              className="pl-2"
              fontWeight="bold"
              onClick={onNavHome}
              // minWidth={378}
              // display={{ xs: 'none', sm: 'initial', md: 'initial' }}
              display={isMinWidth ? 'none' : 'initial'}
            >
              {enviroment.appShortName}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box component="div" >
              <Box component="div" className="flex items-center">
                <DarkMode />
                <UIThemePicker />
                <IconButton
                  id="positioned-button"
                  aria-describedby="positioned-menu"
                  size="medium"
                  edge="end"
                  aria-controls={isMenuOpen ? 'positioned-menu' : undefined}
                  aria-label="account of current user"
                  aria-haspopup="true"
                  aria-expanded={isMenuOpen ? 'true' : undefined}
                  onClick={handleClick}
                  color="inherit"
                >
                  <BackgroundLetterAvatars alt={user?.firstName} src={user?.picture} />
                </IconButton>
              </Box>
              {isMenuOpen && <MenuProfileMobile handleMenuClose={handleMenuClose} isMenuOpen={isMenuOpen} anchorEl={anchorEl} />}
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Offset />
      {openMobile && <SideBarMobileMenu handleClose={handleClose} isOpen={openMobile} menu={menu} />}
    </Box>
  );
};

export default NavBarMobile;
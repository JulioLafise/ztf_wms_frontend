import React from 'react';
import {
  Box,
  Container as MuiContainer,
  type ContainerProps as MuiContainerProps,
  Paper,
  styled
} from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import NavBar from './layouts/NavBar';
import NavBarMobile from './layouts/NavBarMobile';
import SideBarMenu from './layouts/SideBarMenu';
import Footer from './layouts/Footer';
import { Breadcrumbs, TitleRouter, AboutModal } from '@wms/components';
import { useUI, useAuth } from '@wms/hooks';
import { LocalStorageConfig } from '@wms/config';

interface ContainerProps extends MuiContainerProps {
  open?: boolean
}

const Container = styled(MuiContainer, {
  shouldForwardProp: (prop) => prop !== 'open'
})<ContainerProps>(
  ({ theme, open }) => ({
    'transition': theme.transitions.create('paddingInlineStart', {
      easing: theme.transitions.easing.sharp + 1,
      duration: theme.transitions.duration.leavingScreen + 1,
    }),
    ...(open
      ? { 'paddingInlineStart': 260, }
      : { 'paddingInlineStart': 80, }
    ),
    'paddingInlineEnd': 80,
    'height': '100vh',
    [theme.breakpoints.down(768)]: {
      'paddingInline': 25,
      'height': '92vh'
    },
  }),
);

const DashBoardTemplate = () => {
  const { user } = useAuth();
  const {
    menu,
    about,
    onMenu,
    onDarkMode,
    onAboutMenu,
  } = useUI();
  const location = useLocation();
  const navigate = useNavigate();
  const [openSideBar, setOpenSideBar] = React.useState<{ open: boolean, type: 'permanent' | 'temporary' }>({ open: false, type: 'temporary' });

  React.useEffect(() => {
    onMenu(user!);
    const isDark = LocalStorageConfig.getItems().darkMode;
    const rootPath = LocalStorageConfig.getItems().navPath;
    onDarkMode(isDark);
    rootPath && navigate(rootPath, { replace: true }); 
  }, []);

  React.useEffect(() => {
    if (location.pathname !== '/app') {
      LocalStorageConfig.setItem('nav-path', location.pathname);
    }
  }, [location.pathname]);

  return (
    <React.Fragment>
      <Paper className="h-[100vh] overflow-hidden" elevation={1}>
        <NavBar setOpenSideBar={setOpenSideBar} openSideBar={openSideBar.open} />
        <NavBarMobile menu={menu.main} />
        <SideBarMenu menu={menu.main} others={menu.secondary} open={openSideBar.open} setOpen={setOpenSideBar} typeSideBar={openSideBar.type} />
        <Breadcrumbs open={openSideBar.open} />
        <Container maxWidth="xxl" disableGutters id="container-page" className="container-scroll" open={openSideBar.open} >
          <AboutModal isOpen={about.isOpen} onClose={() => { onAboutMenu(!about.isOpen); }} />
          <TitleRouter />
          <Outlet />
          <Box component="div" sx={{ marginTop: 'calc(100% - 80%)' }} />
        </Container>
        <Footer />
      </Paper>
    </React.Fragment>
  );
};

export default DashBoardTemplate;
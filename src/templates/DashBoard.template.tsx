import React from 'react';
import {
  Box,
  Container as MuiContainer,
  Paper,
  styled
} from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import NavBar from './layouts/NavBar';
import NavBarMobile from './layouts/NavBarMobile';
// import SideBarMenu from './layout/SideBarMenu';
import Footer from './layouts/Footer';
import { Breadcrumbs, TitleRouter, AboutModal } from '@wms/components';
import { useUI, useAuth } from '@wms/hooks';
import { LocalStorageConfig } from '@wms/config';

const Container = styled(MuiContainer)(
  ({ theme }) => ({
    'paddingInline': 80,
    'height': '100vh',
    [theme.breakpoints.down('sm')]: {
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
    changePaletteColors
  } = useUI();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    changePaletteColors('oceans-theme');
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
        <NavBar />
        <NavBarMobile menu={menu.main} />
        {/*<SideBarMenu menu={menu.main} others={menu.secondary} /> */}
        <Breadcrumbs />
        <Container id="container-page" className="container-scroll" >
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
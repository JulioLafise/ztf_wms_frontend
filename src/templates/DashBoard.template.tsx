import React from 'react';
import {
  Box,
  Container as MuiContainer,
  type ContainerProps as MuiContainerProps,
  Paper,
  styled,
  useMediaQuery,
  Theme
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
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down(768));
  const { user } = useAuth();
  const {
    menu,
    about,
    onMenu,
    onDarkMode,
    onAboutMenu,
    onSideBarOpen,
    onMobile,
    changePaletteColors
  } = useUI();
  const location = useLocation();
  const navigate = useNavigate();
  const [openSideBar, setOpenSideBar] = React.useState<boolean>(false);
  const [typeSideBar, setTypeSideBar] = React.useState<'permanent' | 'temporary'>('temporary');

  React.useEffect(() => {
    onMenu(user!);
    const isDark = LocalStorageConfig.getItems().darkMode;
    const rootPath = LocalStorageConfig.getItems().navPath;
    const theme = LocalStorageConfig.getItem('theme', 'string', 'olpc-green-theme');
    onDarkMode(isDark);
    rootPath && navigate(rootPath, { replace: true }); 
    changePaletteColors(theme);
  }, []);

  React.useEffect(() => {
    if (location.pathname !== '/app') {
      LocalStorageConfig.setItem('nav-path', location.pathname);
    }
  }, [location.pathname]);

  React.useEffect(() => {
    onSideBarOpen(typeSideBar === 'permanent' ? openSideBar : false);
  }, [openSideBar]);

  React.useEffect(() => {
    onMobile(isMobile);
  }, [isMobile]);

  return (
    <React.Fragment>
      <Paper className="h-[100vh] overflow-hidden" elevation={1}>
        <NavBar setOpenSideBar={setOpenSideBar} setTypeSideBar={setTypeSideBar} openSideBar={openSideBar} />
        <NavBarMobile menu={menu.main} />
        <SideBarMenu
          menu={menu.main}
          others={menu.secondary}
          open={openSideBar}
          setOpen={setOpenSideBar}
          typeSideBar={typeSideBar}
        />
        <Breadcrumbs open={typeSideBar === 'permanent' ? openSideBar : false} />
        <Container
          maxWidth="xxl"
          disableGutters
          id="container-page"
          className="container-scroll"
          open={typeSideBar === 'permanent' ? openSideBar : false}
        >
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
import React from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Paper,
  Toolbar,
  Typography,
  styled,
  useScrollTrigger
} from '@mui/material';

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


const Footer = () => {
  const Offset = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
    top: 'auto',
    bottom: 0
  }));
  const BoxFooter = styled('div')(({ theme }) => ({
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }));
  return (
    <BoxFooter sx={{ flexGrow: 1 }} >
      <Offset />
      <CssBaseline />
      <ElevationScroll>
        <AppBar
          elevation={1}
          position="fixed"
          variant="elevation"
          color="transparent"
          sx={{
            top: 'auto',
            bottom: 0
          }}
        >
          <Paper>
            <Toolbar variant="dense" sx={{ height: 0 }}>
              <Box sx={{ flexGrow: 1 }} />
              <Typography variant="caption" fontSize={10} >© 2024 Zamora Teran Foundation, All rights reserved</Typography>
            </Toolbar>
          </Paper>
        </AppBar>
      </ElevationScroll>
    </BoxFooter>
  );
};

export default Footer;
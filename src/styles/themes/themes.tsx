import { createTheme } from '@mui/material/styles';
import { ThemeUI } from '@wms/interfaces';

const themePalette = ({ isDarkMode, paletteColors }: ThemeUI) => createTheme({
  palette: {
    mode: isDarkMode ? 'dark' : 'light',
    primary: 
    paletteColors?.primary
      ? { ...paletteColors?.primary }
      : {
        light: '#008F70',
        main: '#8BB236',
        dark: '#45A358',
        contrastText: '#fff'
      },
    secondary:
    paletteColors?.secondary
      ? { ...paletteColors?.secondary }
      : {
        light: '#C4299C',
        main: '#5D36B2',
        dark: '#FC487A',
        contrastText: '#fff',
      }
  },
  typography: {
    fontFamily: [
      'Open Sans',
      // 'Roboto',
    ].join(','),
  },
  breakpoints: {
    values: {
      xs: 0,
      ssm: 320,
      sm: 600,
      md: 900,
      lg: 1200, 
      xl: 1536, 
      xxl: 1920,
      kk: 2560,
      xk: 3840,
      xlk: 7680
    },
  },
  transitions: {
    duration: {
      enteringScreen: 12,
      leavingScreen: 7,
      standard: 4,
    }
  }
});

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true; // removes the `xs` breakpoint, extra-small: 0px
    sm: true; // small: 600px
    md: true; // medium: 900px
    lg: true; // large: 1200px
    xl: true; // extra-large: 1536px
    ssm: true; // adds the `mobile` breakpoint
    xxl: true;
    kk: true;
    xk: true;
    xlk: true;
  }
}

export default themePalette;
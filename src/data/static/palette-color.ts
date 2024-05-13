import { Palettes } from '@wms/interfaces';

export default (theme: string): Palettes | undefined => {
  if (theme === 'lafise-theme') {
    return {
      primary: {
        light: '#076615',
        main: '#076615',
        dark: '#048c18',
        contrastText: '#fff',
      },
      secondary: {
        light: '#06911a',
        main: '#06911a',
        dark: '#013809',
        contrastText: '#fff',
      }
    };
  }
  if (theme === 'oceans-theme') {
    return {
      primary: {
        light: '#668DC0',
        main: '#304A6E',
        dark: '#0F1C30',
        contrastText: '#fff'
      },
      secondary: {
        light: '#06911a',
        main: '#06911a',
        dark: '#013809',
        contrastText: '#fff',
      }
    };
  }
  if (theme === 'summer-theme') {
    return {
      primary: {
        light: '#ffb74d',
        main: '#ffa726',
        dark: '#f57c00',
        contrastText: '#fff'
      },
      secondary: {
        light: '#06911a',
        main: '#06911a',
        dark: '#013809',
        contrastText: '#fff',
      }
    };
  }
  return undefined;
};
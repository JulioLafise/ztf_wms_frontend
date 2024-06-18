import { Palettes } from '@wms/interfaces';

export default (theme: string): Palettes | undefined => {
  if (theme === 'olpc-green-theme') {
    return {
      primary: {
        light: '#008F70',
        main: '#8BB236',
        dark: '#45A358',
        contrastText: '#fff'
      },
      secondary: {
        light: '#C4299C',
        main: '#5D36B2',
        dark: '#FC487A',
        contrastText: '#fff',
      }
    };
  }
  if (theme === 'olpc-orange-theme') {
    return {
      primary: {
        light: '#8E9233',
        main: '#D99138',
        dark: '#4B884E',
        contrastText: '#fff'
      },
      secondary: {
        light: '#30230F',
        main: '#00A5EC',
        dark: '#00C5DD',
        contrastText: '#fff',
      }
    };
  }
  if (theme === 'olpc-blue-theme') {
    return {
      primary: {
        light: '#00A9D4',
        main: '#318AC6',
        dark: '#00C5CA',
        contrastText: '#fff'
      },
      secondary: {
        light: '#C15459',
        main: '#C66D31',
        dark: '#A14F76',
        contrastText: '#fff',
      }
    };
  }
  if (theme === 'olpc-pink-theme') {
    return {
      primary: {
        light: '#DC4E65',
        main: '#B63170',
        dark: '#F67559',
        contrastText: '#fff'
      },
      secondary: {
        light: '#00A185',
        main: '#31B677',
        dark: '#008B88',
        contrastText: '#fff',
      }
    };
  }
  if (theme === 'olpc-gray-theme') {
    return {
      primary: {
        light: '#898E97',
        main: '#9A999E',
        dark: '#73848F',
        contrastText: '#fff'
      },
      secondary: {
        light: '#868D86',
        main: '#9D9E99',
        dark: '#6D7C76',
        contrastText: '#fff',
      }
    };
  }
  return undefined;
};
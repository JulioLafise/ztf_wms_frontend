import { AppDispatch } from '../../store/store';
import { PaletteTheme, Palettes } from '@wms/interfaces';
import { paletteColors, menu as main, settings } from '@wms/static';
import {
  onDarkMode,
  onPaletteColor,
  onMenuList,
  onAboutMenu
} from '../../../redux/reducer/slices/ui.slice';

export const changeMode = (isModeDark: boolean, isLogout = false) => {
  return (dispatch: AppDispatch) => {
    try {
      dispatch(onDarkMode(isModeDark));
      if (!isLogout) localStorage.setItem('dark-mode', String(isModeDark));
      return isModeDark;
    } catch (error: any) {
      throw new Error(error);
    }
  };
};

export const handleAboutMenu = (isOpen: boolean) => {
  return (dispatch: AppDispatch) => {
    try {
      dispatch(onAboutMenu(isOpen));
      return isOpen;
    } catch (error: any) {
      throw new Error(error);
    }
  };
};

export const changePaletteColors = (theme: PaletteTheme['paletteColors']) => {
  return (dispatch: AppDispatch) => {
    try {
      const palette: Palettes | undefined = paletteColors(theme);
      dispatch(onPaletteColor(palette));
      return palette;
    } catch (error: any) {
      throw new Error(error);
    }
  };
};

export const onMenus = (user: any) => {
  return (dispatch: AppDispatch) => {
    // const isAdmin = user.isAdmin;
    // const rolName: string = user.rol?.rolName?.toLowerCase() || '';
    try {
      // const mainFilter = !isAdmin ? main : main.map(menu => {
      //   if (menu.roles.includes('*') || menu.roles.join('|').toLowerCase().split('|').includes(rolName)) {
      //     return {
      //       ...menu,
      //       children: menu.children?.map(children => {
      //         if (children.roles.includes('*') || children.roles.join('|').toLowerCase().split('|').includes(rolName)) {
      //           return children;
      //         } return null;
      //       })
      //     };
      //   }
      //   return null;
      // });
      // const secondaryFilter = !isAdmin ? settings : settings.map(menu => {
      //   if (menu.roles.includes('*') || menu.roles.join('|').toLowerCase().split('|').includes(rolName)) {
      //     return {
      //       ...menu,
      //       children: menu.children?.map(children => {
      //         if (children.roles.includes('*') || children.roles.join('|').toLowerCase().split('|').includes(rolName)) {
      //           return children;
      //         } return null;
      //       })
      //     };
      //   }
      //   return null;
      // });
      const menu = {
        main,
        secondary: settings
      };
      // const menu = {
      //   main: mainFilter.filter(ft => ft?.menuId),
      //   secondary: secondaryFilter.filter(ft => ft?.menuId)
      // };
      dispatch(onMenuList(menu));
      return menu;
    } catch (error: any) {
      throw new Error(error);
    }
  };
};
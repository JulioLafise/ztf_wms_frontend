import { PayloadAction, } from '@reduxjs/toolkit';
import { AppDispatch } from '@wms/redux/store';
import { ThemeUI, IMenuList } from './ui.interface';

export type IDispatch = AppDispatch;

export type IPromiseThunks<T> = Promise<PayloadAction<T, string, 
{
  arg: any;
  requestId: string;
  requestStatus: 'fulfilled';
  }, never> | PayloadAction<unknown, string, {}>>;

// SLICES PROPS

// SLICE AUTH
export interface IAuthProps {
  user: any | null,
  isChecking: boolean,
  isAuthenticated: boolean,
  isChangePassword: boolean,
  error: any
}

// SLICE UI
export interface IUIProps {
  theme: ThemeUI,
  menu: IMenu,
  about: {
    isOpen: boolean
  },
  isSideBarOpen: boolean,
  isMobile: boolean,
  error: any
}

export type IMenu = { main: IMenuList[], secondary: IMenuList[] }

// SLICE CATALOGUE
export interface ICatalogueProps<T> {
  data: T[],
  rowCount: number,
  isGenerate: boolean,
  error: any
}

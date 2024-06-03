import { useAppSelector, useAppDispatch } from '@wms/redux/selector';
import { PaletteTheme } from '@wms/interfaces';
import { uiSyncThunks } from '@wms/redux/actions';

const useUI = () => {
  const dispatch = useAppDispatch();

  const { theme, menu, about, isSideBarOpen, isMobile } = useAppSelector(state => state.uiReducer);

  const onDarkMode = (isActive: boolean, isLogout = false) => {
    try {
      return dispatch(uiSyncThunks.changeMode(isActive, isLogout));
    } catch (error) {
      return error;
    }
  };

  const onAboutMenu = (isOpen: boolean) => {
    try {
      return dispatch(uiSyncThunks.handleAboutMenu(isOpen));
    } catch (error) {
      return error;
    }
  };

  const changePaletteColors = (theme: PaletteTheme['paletteColors']) => {
    try {
      return dispatch(uiSyncThunks.changePaletteColors(theme));
    } catch (error) {
      return error;
    }
  };

  const onSideBarOpen = (isOpen: boolean) => {
    try {
      return dispatch(uiSyncThunks.changueSideBarState(isOpen));
    } catch (error) {
      return error;
    }
  };

  const onMobile = (isMobile: boolean) => {
    try {
      return dispatch(uiSyncThunks.changueMobileState(isMobile));
    } catch (error) {
      return error;
    }
  };

  const onMenu = (user: any) => {
    try {
      return dispatch(uiSyncThunks.onMenus(user));
    } catch (error) {
      return error;
    }
  };

  return {
    // VAR
    theme,
    menu,
    about,
    isSideBarOpen,
    isMobile,
    // METHODS
    onDarkMode,
    changePaletteColors,
    onMenu,
    onAboutMenu,
    onSideBarOpen,
    onMobile
  };
};

export default useUI;
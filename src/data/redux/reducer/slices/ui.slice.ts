import { createSlice } from '@reduxjs/toolkit';
import { IUIProps } from '@wms/interfaces';

const initialState: IUIProps = {
  theme: {
    isDarkMode: false,
    paletteColors: undefined
  },
  menu: {
    main: [],
    secondary: []
  },
  about: {
    isOpen: false
  },
  isSideBarOpen: false,
  isMobile: false,
  error: undefined
};

const uiSlice = createSlice({
  initialState,
  name: 'ui',
  reducers: {
    onDarkMode: (state, { payload }) => {
      state.theme.isDarkMode = payload;
    },
    onPaletteColor: (state, {payload}) => {
      state.theme.paletteColors = payload;
    },
    onMenuList: (state, { payload }) => {
      state.menu = payload;
    },
    onAboutMenu: (state, { payload }) => {
      state.about.isOpen = payload;
    },
    onSideBarOpen: (state, { payload }) => {
      state.isSideBarOpen = payload;
    },
    onMobile: (state, { payload }) => {
      state.isMobile = payload;
    },
    onReset: () => initialState,
  },
});


export const {
  onDarkMode,
  onPaletteColor,
  onMenuList,
  onAboutMenu,
  onSideBarOpen,
  onMobile,
  onReset,
} = uiSlice.actions;

export default uiSlice.reducer;
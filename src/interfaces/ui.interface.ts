export interface ThemeUI {
  isDarkMode: boolean,
  paletteColors?: Palettes
}

export interface Palettes {
  primary: PaletteColor,
  secondary: PaletteColor
}

export interface PaletteColor {
  light: string;
  main: string;
  dark: string;
  contrastText: string;
}

export interface PaletteTheme {
  paletteColors: 'olpc-green-theme' | 'olpc-pink-theme' | 'olpc-gray-theme' | 'olpc-blue-theme' | 'olpc-orange-theme'
}

export interface IMenuList {
  menuId: string,
  menuUrl: string,
  menuName: string,
  description: string,
  icon: string,
  children?: IMenuList[],
  roles: Array<string>
}
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
  paletteColors: 'lafise-theme' | 'summer-theme' | 'oceans-theme'
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
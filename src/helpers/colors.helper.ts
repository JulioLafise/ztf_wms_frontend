/* ======================================================== */
/* Project original https://chir.ag/projects/ntc */
/* Original created by Chirag Mehta */
/* ======================================================== */
/* Modified by Julio Perez */
/* ======================================================== */
import { colorName } from '@wms/static';

type ColorNameResult = { hexacolor: string, name: string, isExactMatch: boolean };

export class Colors {

  constructor() { }

  static getNameByHex(hexacolor: string): ColorNameResult {
    let upperHexacolor = hexacolor.toUpperCase();
    if (upperHexacolor.length < 3 || upperHexacolor.length > 7)
      return {
        hexacolor: '#000000', name: `Invalid Color: ${upperHexacolor}`, isExactMatch: false
      };
    if (upperHexacolor.length % 3 == 0)
      upperHexacolor = '#' + upperHexacolor;
    if (upperHexacolor.length == 4)
      upperHexacolor = '#' + upperHexacolor.substring(1, 1) + upperHexacolor.substring(1, 1) + upperHexacolor.substring(2, 1) + upperHexacolor.substring(2, 1) + upperHexacolor.substring(3, 1) + upperHexacolor.substring(3, 1);

    const rgb = this.rgb(upperHexacolor);
    const r = rgb[0], g = rgb[1], b = rgb[2];
    const hsl = this.hsl(upperHexacolor);
    const h = hsl[0], s = hsl[1], l = hsl[2];
    let ndf1 = 0; 
    let ndf2 = 0; 
    let ndf = 0;
    let cl = -1, df = -1;

    for (let i = 0; i < colorName.length; i++) {
      if (upperHexacolor == '#' + colorName[i][0])
        return {
          hexacolor: `#${colorName[i][0]}`,
          name: colorName[i][1],
          isExactMatch: true
        };

      ndf1 = Math.pow(r - parseInt(colorName[i][2]), 2) + Math.pow(g - parseInt(colorName[i][3]), 2) + Math.pow(b - parseInt(colorName[i][4]), 2);
      ndf2 = Math.pow(h - parseInt(colorName[i][5]), 2) + Math.pow(s - parseInt(colorName[i][6]), 2) + Math.pow(l - parseInt(colorName[i][7]), 2);
      ndf = ndf1 + ndf2 * 2;
      if (df < 0 || df > ndf) {
        df = ndf;
        cl = i;
      }
    }

    return cl < 0 ? {
      hexacolor: '#000000', name: `Invalid Color: ${upperHexacolor}`, isExactMatch: false
    } : {
      hexacolor: `#${colorName[cl][0]}`,
      name: colorName[cl][1],
      isExactMatch: false
    };
  }

  private static hsl (hexacolor: string) {
    const rgb = [parseInt('0x' + hexacolor.substring(1, 3)) / 255, parseInt('0x' + hexacolor.substring(3, 5)) / 255, parseInt('0x' + hexacolor.substring(5, 7)) / 255];

    const r = rgb[0], g = rgb[1], b = rgb[2];

    const min = Math.min(r, Math.min(g, b));
    const max = Math.max(r, Math.max(g, b));
    const delta = max - min;
    const l = (min + max) / 2;

    let s = 0;
    if(l > 0 && l < 1)
      s = delta / (l < 0.5 ? (2 * l) : (2 - 2 * l));

    let h = 0;
    if(delta > 0)
    {
      if (max == r && max != g) h += (g - b) / delta;
      if (max == g && max != b) h += (2 + (b - r) / delta);
      if (max == b && max != r) h += (4 + (r - g) / delta);
      h /= 6;
    }
    return [parseInt(`${h * 255}`), parseInt(`${s * 255}`), parseInt(`${l * 255}`)];
  }

  private static rgb(hexacolor: string) {
    return [parseInt('0x' + hexacolor.substring(1, 3)), parseInt('0x' + hexacolor.substring(3, 5)),  parseInt('0x' + hexacolor.substring(5, 7))];
  }
}
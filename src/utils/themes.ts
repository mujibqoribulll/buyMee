import { palettes } from './palettes';

export const themes = {
  default: {
    dark: false,
    colors: palettes.default,
    fonts: {
      regular: 'System',
      medium: 'System',
      bold: 'System',
    },
  },
  dark: {
    dark: true,
    colors: palettes.dark,
    fonts: {
      regular: 'System',
      medium: 'System',
      bold: 'System',
    },
  },
};

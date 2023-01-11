import { createTheme } from 'newskit';

import borders from './styles/borders.json';
import colors from './styles/colors.json';
import overlays from './styles/overlays.json';
import shadows from './styles/shadows.json';

import { fonts } from './styles/fonts';
import { typographyPresets } from './styles/typography-presets';

import { stylePresets } from './style-presets';

export const TimesWebLightTheme = createTheme({
  name: 'times-web-light',
  overrides: {
    breakpoints: {
      xs: 0,
      sm: 520,
      md: 768,
      lg: 1024,
      xl: 1320
    },
    borders,
    colors,
    overlays,
    shadows,
    fonts,
    typographyPresets,
    stylePresets
  }
});

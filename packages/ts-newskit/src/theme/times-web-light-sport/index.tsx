// @ts-nocheck
import { createTheme } from 'newskit';
import { TheTimesLightSport } from '@newskit-themes/the-times';
import { stylePresets } from '../times-web-light/style-presets';
import { typographyPresets } from '../times-web-light/styles/typography-presets';

const themeTypographyPresets = TheTimesLightSport.typographyPresets;

export const TimesWebLightSportTheme = createTheme({
  name: 'times-web-light-sport',
  overrides: {
    breakpoints: {
      xs: 0,
      sm: 520,
      md: 768,
      lg: 1024,
      xl: 1320
    },
    ...TheTimesLightSport,
    typographyPresets: {
      ...themeTypographyPresets,
      ...typographyPresets
    },
    stylePresets
  }
});

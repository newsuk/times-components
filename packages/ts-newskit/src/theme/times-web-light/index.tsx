// @ts-nocheck
import { createTheme } from 'newskit';
import { TheTimesLight } from '@newskit-themes/the-times';

import { stylePresets } from './style-presets';
import { typographyPresets } from './styles/typography-presets';

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
    ...TheTimesLight,
    typographyPresets,
    stylePresets
  }
});

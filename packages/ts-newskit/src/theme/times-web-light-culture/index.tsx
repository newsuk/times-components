// @ts-nocheck
import { createTheme } from 'newskit';
import TheTimesLightCulture from '@newskit-themes/the-times/TheTimes-light-culture.json';
import { stylePresets } from '../times-web-light/style-presets';
import { typographyPresets } from '../times-web-light/styles/typography-presets';
import { formatThemeOverrides } from '../../utils/theme-formatting';

const themeOverrides = {
  stylePresets,
  typographyPresets
};

const updatedTheme = formatThemeOverrides(TheTimesLightCulture, themeOverrides);

export const TimesWebLightCultureTheme = createTheme({
  name: 'times-web-light-culture',
  ...updatedTheme
});

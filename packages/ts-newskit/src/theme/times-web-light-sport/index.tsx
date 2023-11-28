// @ts-nocheck
import { createTheme } from 'newskit';
import TheTimesLightSport from '@newskit-themes/the-times/TheTimes-light-sport.json';
import { stylePresets } from '../times-web-light/style-presets';
import { typographyPresets } from '../times-web-light/styles/typography-presets';
import { formatThemeOverrides } from '../../utils/theme-formatting';

const themeOverrides = {
  stylePresets,
  typographyPresets,
};

const updatedTheme = formatThemeOverrides(TheTimesLightSport, themeOverrides);

export const TimesWebLightSportTheme = createTheme({
  name: 'times-web-light-sport',
  ...updatedTheme,
});

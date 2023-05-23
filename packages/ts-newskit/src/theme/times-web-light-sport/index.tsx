// @ts-nocheck
import { createTheme } from 'newskit';
import { TheTimesLightSport } from '@newskit-themes/the-times';
import { stylePresets } from '../times-web-light/style-presets';
import { typographyPresets } from '../times-web-light/styles/typography-presets';
import { formatThemeOverrides } from '../../utils/theme-formatting';

const updatedTheme = formatThemeOverrides(
  TheTimesLightSport,
  stylePresets,
  typographyPresets
);

export const TimesWebLightSportTheme = createTheme({
  name: 'times-web-light-sport',
  ...updatedTheme
});

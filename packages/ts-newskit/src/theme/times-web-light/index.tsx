// @ts-nocheck
import { createTheme } from 'newskit';
import TheTimesLight from '@newskit-themes/the-times/TheTimes-light.json';
import { stylePresets } from './style-presets';
import { typographyPresets } from './styles/typography-presets';
import { formatThemeOverrides } from '../../utils/theme-formatting';

const themeOverrides = {
  stylePresets,
  typographyPresets
}

const updatedTheme = formatThemeOverrides(
  TheTimesLight,
  themeOverrides
);

export const TimesWebLightTheme = createTheme({
  name: 'times-web-light',
  ...updatedTheme
});

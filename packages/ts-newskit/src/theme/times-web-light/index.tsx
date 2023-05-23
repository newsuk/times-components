// @ts-nocheck
import { createTheme } from 'newskit';
import { TheTimesLight } from '@newskit-themes/the-times';
import { stylePresets } from './style-presets';
import { typographyPresets } from './styles/typography-presets';
import { formatThemeOverrides } from '../../utils/theme-formatting';

const updatedTheme = formatThemeOverrides(
  TheTimesLight,
  stylePresets,
  typographyPresets
);

export const TimesWebLightTheme = createTheme({
  name: 'times-web-light',
  ...updatedTheme
});

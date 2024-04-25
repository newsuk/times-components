// @ts-nocheck
import { createTheme } from 'newskit';
import TheTimesLightLifeAndStyle from '@newskit-themes/the-times/TheTimes-dark-lifeStyle.json';
import { stylePresets } from '../times-web-light/style-presets';
import { typographyPresets } from '../times-web-light/styles/typography-presets';
import { formatThemeOverrides } from '../../utils/theme-formatting';

const themeOverrides = {
  stylePresets,
  typographyPresets
};

const updatedTheme = formatThemeOverrides(
  TheTimesLightLifeAndStyle,
  themeOverrides
);

export const TimesWebLightLifeAndStyleTheme = createTheme({
  name: 'times-web-light-life-and-style',
  ...updatedTheme
});

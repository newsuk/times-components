// @ts-nocheck
import { createTheme } from 'newskit';
import TheTimesLightBusiness from '@newskit-themes/the-times/TheTimes-light-business.json';
import { stylePresets } from '../times-web-light/style-presets';
import { typographyPresets } from '../times-web-light/styles/typography-presets';
import { formatThemeOverrides } from '../../utils/theme-formatting';

const themeOverrides = {
  stylePresets,
  typographyPresets
};

const updatedTheme = formatThemeOverrides(
  TheTimesLightBusiness,
  themeOverrides
);

export const TimesWebLightBusinessTheme = createTheme({
  name: 'times-web-light-business',
  ...updatedTheme
});

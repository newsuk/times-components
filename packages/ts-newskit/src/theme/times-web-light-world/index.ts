// @ts-nocheck
import { createTheme } from 'newskit';
import TheTimesLightWorld from '@newskit-themes/the-times/TheTimes-light-world.json';
import { stylePresets } from '../times-web-light/style-presets';
import { typographyPresets } from '../times-web-light/styles/typography-presets';
import { formatThemeOverrides } from '../../utils/theme-formatting';

const themeOverrides = {
  stylePresets,
  typographyPresets
};

const updatedTheme = formatThemeOverrides(TheTimesLightWorld, themeOverrides);

export const TimesWebLightWorldTheme = createTheme({
  name: 'times-web-light-world',
  ...updatedTheme
});

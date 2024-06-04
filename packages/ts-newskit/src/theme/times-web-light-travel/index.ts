// @ts-nocheck
import { createTheme } from 'newskit';
import TheTimesLightTravel from '@newskit-themes/the-times/TheTimes-light-travel.json';
import { stylePresets } from '../times-web-light/style-presets';
import { typographyPresets } from '../times-web-light/styles/typography-presets';
import { formatThemeOverrides } from '../../utils/theme-formatting';

const themeOverrides = {
  stylePresets,
  typographyPresets
};

const updatedTheme = formatThemeOverrides(TheTimesLightTravel, themeOverrides);

export const TimesWebLightTravelTheme = createTheme({
  name: 'times-web-light-travel',
  ...updatedTheme
});

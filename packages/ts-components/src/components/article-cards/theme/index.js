import { createTheme } from 'newskit';
import TheTimesLightTravel from '@newskit-themes/the-times/TheTimes-light-travel.json';
import { typographyPresets } from './typography-presets';
import { stylePresets } from './style-presets';
import { formatThemeOverrides } from './theme-formating';

const themeOverrides = {
  stylePresets,
  typographyPresets,
};

const updatedTheme = formatThemeOverrides(TheTimesLightTravel, themeOverrides);

export const TimesWebLightTravelTheme = createTheme({
  name: 'times-web-light-travel',
  ...updatedTheme,
});

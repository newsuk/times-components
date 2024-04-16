// @ts-nocheck
import { createTheme } from 'newskit';
import TheTimesLightNews from '@newskit-themes/the-times/TheTimes-light-news.json';
import { stylePresets } from '../times-web-light/style-presets';
import { typographyPresets } from '../times-web-light/styles/typography-presets';
import { formatThemeOverrides } from '../../utils/theme-formatting';

const themeOverrides = {
  stylePresets,
  typographyPresets
};

const updatedTheme = formatThemeOverrides(TheTimesLightNews, themeOverrides);

export const TimesWebLightNews = createTheme({
  name: 'times-web-light-news',
  ...updatedTheme
});
// @ts-nocheck
import { createTheme } from 'newskit';
import TheTimesLightComment from '@newskit-themes/the-times/TheTimes-light-comment.json';
import { stylePresets } from '../times-web-light/style-presets';
import { typographyPresets } from '../times-web-light/styles/typography-presets';
import { formatThemeOverrides } from '../../utils/theme-formatting';

const themeOverrides = {
  stylePresets,
  typographyPresets
};

const updatedTheme = formatThemeOverrides(TheTimesLightComment, themeOverrides);

export const TimesWebLightComment = createTheme({
  name: 'times-web-light-comment',
  ...updatedTheme
});
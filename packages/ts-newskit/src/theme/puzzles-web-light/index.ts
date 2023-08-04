// @ts-nocheck
import { createTheme } from 'newskit';
import TheTimesLightPuzzle from '@newskit-themes/the-times/TheTimes-light-puzzle.json';
import { stylePresets } from './style-presets';
import { formatThemeOverrides } from '../../utils/theme-formatting';

const updatedTheme = formatThemeOverrides(TheTimesLightPuzzle, stylePresets);

export const PuzzlesWebLightTheme = createTheme({
  name: 'puzzles-web-light',
  ...updatedTheme
});

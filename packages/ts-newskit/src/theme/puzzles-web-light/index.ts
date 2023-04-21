// @ts-nocheck
import { createTheme } from 'newskit';
import { TheTimesLightPuzzle } from '@newskit-themes/the-times';
import { stylePresets } from './style-presets';

export const PuzzlesWebLightTheme = createTheme({
  name: 'puzzles-web-light',
  overrides: {
    breakpoints: {
      xs: 0,
      sm: 520,
      md: 768,
      lg: 1024,
      xl: 1320
    },
    ...TheTimesLightPuzzle,
    stylePresets
  }
});

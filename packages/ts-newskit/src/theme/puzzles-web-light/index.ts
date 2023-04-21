// @ts-nocheck
import { createTheme } from 'newskit';
import {
  typographyPresets,
  colors,
  borders,
  fonts,
  overlays,
  shadows,
  sizing,
  spacePresets
} from '@newskit-themes/the-times/TheTimes-light-puzzle.json';
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
    colors,
    borders,
    fonts,
    overlays,
    shadows,
    sizing,
    spacePresets,
    typographyPresets,
    stylePresets
  }
});

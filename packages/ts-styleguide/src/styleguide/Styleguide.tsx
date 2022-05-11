import 'react';
import colours from './colours/colours';
import Animations from './components/Animations';

import breakpoints, {
  editionBreakpoints,
  editionMaxWidth,
  getEditionBreakpoint,
  editionBreakpointWidths,
  sliceContentMaxWidth
} from './breakpoints';
import lineHeight from './lineHeight';
import { timesFontFactory, timesFontSizes, fontStyles } from './fonts/fonts';
import themeFactory from './themeFactory';

import scales from './scales';
import spacing, { globalSpacingStyles } from './spacing';

const { nativeTablet, nativeTabletWide } = breakpoints;

export const tabletRowPadding = 20;

export default () => {
  return {
    Animations,
    colours,
    fontFactory: timesFontFactory,
    fonts: fontStyles,
    fontSizes: timesFontSizes,
    lineHeight,
    spacing
  };
};

export {
  Animations,
  breakpoints,
  colours,
  editionBreakpoints,
  editionBreakpointWidths,
  editionMaxWidth,
  sliceContentMaxWidth,
  fontStyles as fonts,
  timesFontFactory as fontFactory,
  timesFontSizes as fontSizes,
  getEditionBreakpoint,
  lineHeight,
  scales,
  spacing,
  globalSpacingStyles,
  nativeTablet as tabletWidth,
  nativeTabletWide as tabletWidthMax,
  themeFactory
};

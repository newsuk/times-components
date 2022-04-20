import 'react';

import colours from './colours/colours';
import Animations from './Animations';

import {
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

export const tabletRowPadding = 20;

export default ({ scale = scales.medium } = {}) => {
  // @ts-ignore
  return {
    Animations,
    colours,
    fontFactory: timesFontFactory(scale),
    fonts: fontStyles,
    // @ts-ignore
    fontSizes: timesFontSizes[scale],
    lineHeight,
    spacing
  };
};

export {
  Animations,
  // breakpoints,
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
  // tabletWidth,
  // tabletWidthMax,
  themeFactory
};

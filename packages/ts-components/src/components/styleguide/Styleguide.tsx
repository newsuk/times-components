import 'react';

import colours from  "./colours/colours";
import Animations from './Animations';

import {
  editionBreakpoints,
  editionMaxWidth,
  getEditionBreakpoint,
  editionBreakpointWidths,
  sliceContentMaxWidth
} from './breakpoints';
import timesLineHeightsFactory from './lineHeight';
import fonts  from './fonts/fonts';
import timesFontSizes from './fonts/font-sizes';
import { timesFontFactory } from './fonts/font-factory';
import themeFactory from './themeFactory';

import scales from './scales';
import spacing, { globalSpacingStyles } 
from './spacing';

const fontFactory = timesFontFactory;
const fontSizes = timesFontSizes;
const lineHeight = timesLineHeightsFactory;
// const {
//   nativeTablet: tabletWidth,
//   nativeTabletWide: tabletWidthMax
// } = breakpoints;
const tabletRowPadding = 20;

const styleguide = ({ scale = scales.medium } = {}) => ({
  Animations,
  colours,
  fontFactory: timesFontFactory(scale),
  fonts,
  // @ts-ignore
  fontSizes: timesFontSizes[scale],
  lineHeight: timesLineHeightsFactory(scale),
  spacing
});

export default styleguide;

export {
  Animations,
  // breakpoints,
  colours,
  editionBreakpoints,
  editionBreakpointWidths,
  editionMaxWidth,
  sliceContentMaxWidth,
  fonts,
  fontFactory,
  fontSizes,
  getEditionBreakpoint,
  lineHeight,
  scales,
  spacing,
  globalSpacingStyles,
  tabletRowPadding,
  // tabletWidth,
  // tabletWidthMax,
  themeFactory,
};



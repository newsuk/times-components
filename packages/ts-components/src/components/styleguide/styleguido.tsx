import 'react';

import colours from './colours/colours';
import Animations from './Animations';

import lineHeight from './lineHeight';
import { timesFontFactory, timesFontSizes, fontStyles } from './fonts/fonts';

import scales from './scales';
import spacing from './spacing';

// const {
//   nativeTablet: tabletWidth,
//   nativeTabletWide: tabletWidthMax
// } = breakpoints;
export const tabletRowPadding = 20;
// ({ scale = scales.medium } = {}) => ({
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

// const styleguide = () => ({
//   Animations,
//   colours,
//   fontFactory: timesFontFactory(scales.medium),
//   fonts: fontStyles,
//   // @ts-ignore
//   fontSizes: timesFontSizes[scale],
//   lineHeight: timesLineHeightsFactory(scales.medium),
//   spacing
// });
// console.log(styleguide)

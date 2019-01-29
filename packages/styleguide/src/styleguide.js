import sectionColours, { secondarySectionColours } from "./colours/section";
import functionalColours from "./colours/functional";

import FadeIn from "./animations";

import breakpoints from "./breakpoints";
import timesLineHeightsFactory from "./line-heights";
import timesFonts from "./fonts/fonts";
import timesFontSizes from "./fonts/font-sizes";
import timesFontFactory from "./fonts/font-factory";
import themeFactory from "./theme/theme-factory";

import scales from "./scales";
import spacing from "./spacing";

const colours = {
  functional: functionalColours,
  secondarySectionColours,
  section: sectionColours
};

const Animations = {
  FadeIn
};
const fonts = timesFonts;
const fontFactory = timesFontFactory();
const fontSizes = timesFontSizes();
const lineHeight = timesLineHeightsFactory();
const {
  nativeTablet: tabletWidth,
  nativeTabletWide: tabletWidthMax
} = breakpoints;
const tabletRowPadding = 20;

export {
  Animations,
  breakpoints,
  colours,
  fonts,
  fontFactory,
  fontSizes,
  lineHeight,
  scales,
  spacing,
  tabletRowPadding,
  tabletWidth,
  tabletWidthMax,
  themeFactory
};
export default ({ scale = scales.medium } = {}) => ({
  Animations,
  colours,
  fontFactory: timesFontFactory(scale),
  fonts,
  fontSizes: timesFontSizes(scale),
  lineHeight: timesLineHeightsFactory(scale),
  spacing
});

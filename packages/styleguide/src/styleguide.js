import sectionColours from "./colours/section";
import functionalColours from "./colours/functional";

import FadeIn from "./animations";

import timesLineHeightsFactory from "./line-heights";
import timesFonts from "./fonts/fonts";
import timesFontSizes from "./fonts/font-sizes";
import timesFontFactory from "./fonts/font-factory";

import scales from "./scales";
import spacing from "./spacing";

const colours = {
  functional: functionalColours,
  section: sectionColours
};

const Animations = {
  FadeIn
};
const breakpoints = {
  huge: 1320,
  medium: 768,
  small: 520,
  wide: 1024
};
const fonts = timesFonts;
const fontFactory = timesFontFactory();
const fontSizes = timesFontSizes();
const lineHeight = timesLineHeightsFactory();

export {
  Animations,
  breakpoints,
  colours,
  fonts,
  fontFactory,
  fontSizes,
  lineHeight,
  scales,
  spacing
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

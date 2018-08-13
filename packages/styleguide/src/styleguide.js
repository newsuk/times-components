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
  section: sectionColours,
  functional: functionalColours
};

const Animations = {
  FadeIn
};

const fonts = timesFonts;
const fontFactory = timesFontFactory();
const fontSizes = timesFontSizes();
const lineHeight = timesLineHeightsFactory();

export {
  Animations,
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
  fonts,
  fontFactory: timesFontFactory(scale),
  fontSizes: timesFontSizes(scale),
  lineHeight: timesLineHeightsFactory(scale),
  spacing
});

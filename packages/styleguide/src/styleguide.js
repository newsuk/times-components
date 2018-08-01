import sectionColours from "./colours/section";
import functionalColours from "./colours/functional";

import FadeIn from "./animations";

import timesFonts from "./fonts/fonts";
import timesFontSizes from "./fonts/font-sizes";

import timesSpacing from "./spacing";

import timesLineHeightsFactory from "./line-heights";
import timesFontFactory from "./fonts/font-factory";

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
const spacing = timesSpacing;

export { Animations, colours, fonts, fontFactory, fontSizes, lineHeight, spacing };
export default ({ scale }) => ({
  Animations,
  colours,
  fonts,
  fontFactory: timesFontFactory(scale),
  fontSizes: timesFontSizes(scale),
  lineHeight: timesLineHeightsFactory(scale),
  spacing
});

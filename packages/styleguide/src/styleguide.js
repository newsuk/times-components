import sectionColours from "./colours/section";
import functionalColours from "./colours/functional";

import FadeIn from "./animations";

import timesFonts from "./fonts/fonts";
import timesFontSizes from "./fonts/font-sizes";

import timesSpacing from "./spacing";

const colours = {
  section: sectionColours,
  functional: functionalColours
};

const Animations = {
  FadeIn
};

const fonts = timesFonts;
const fontSizes = timesFontSizes();

const spacing = timesSpacing;
export { colours, Animations, fonts, fontSizes, spacing };
export default ({ scale }) => ({
  colours,
  Animations,
  fonts,
  fontSizes: timesFontSizes(scale),
  spacing
});

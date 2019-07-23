import {
  fonts,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const headlineFontSizeResolver = {
  [editionBreakpoints.medium]: 40,
  [editionBreakpoints.huge]: 45,
  [editionBreakpoints.wide]: 45
};

export default breakpoint => ({
  container: {
    paddingBottom: spacing(3),
    paddingHorizontal: spacing(6),
    paddingTop: spacing(3)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: headlineFontSizeResolver[breakpoint],
    lineHeight: headlineFontSizeResolver[breakpoint]
  }
});

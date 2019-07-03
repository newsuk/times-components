import {
  fonts,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const headlineFontSizeResolver = {
  [editionBreakpoints.huge]: 35,
  [editionBreakpoints.wide]: 35,
  [editionBreakpoints.small]: 30,
  [editionBreakpoints.medium]: 30
};

export default breakpoint => ({
  container: {
    paddingHorizontal: spacing(2)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: headlineFontSizeResolver[breakpoint],
    lineHeight: headlineFontSizeResolver[breakpoint]
  },
  imageContainer: {
    paddingBottom: spacing(1)
  },
  summaryContainer: {
    paddingVertical: spacing(1)
  }
});

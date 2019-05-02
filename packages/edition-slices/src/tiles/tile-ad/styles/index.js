import {
  fonts,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const headlineFontSizeResolver = {
  [editionBreakpoints.huge]: 22,
  [editionBreakpoints.wide]: 22,
  [editionBreakpoints.small]: 20,
  [editionBreakpoints.medium]: 20
};

export default breakpoint => ({
  container: {
    flexDirection: "row",
    padding: spacing(2)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: headlineFontSizeResolver[breakpoint],
    lineHeight: headlineFontSizeResolver[breakpoint]
  },
  imageContainer: {
    width: "30%"
  },
  summaryContainer: {
    paddingHorizontal: spacing(2),
    width: "70%"
  }
});

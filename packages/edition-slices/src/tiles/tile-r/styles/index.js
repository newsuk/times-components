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
    flex: 1,
    padding: spacing(2)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: headlineFontSizeResolver[breakpoint],
    lineHeight: headlineFontSizeResolver[breakpoint]
  },
  imageContainer: {
    width: "100%",
    marginBottom: spacing(2)
  },
  summaryContainer: {
    flex: 1
  }
});

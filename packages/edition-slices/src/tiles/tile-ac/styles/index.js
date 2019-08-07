import {
  colours,
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
    flex: 1,
    padding: spacing(2)
  },
  headline: {
    color: colours.functional.brandColour,
    fontFamily: fonts.headline,
    fontSize: headlineFontSizeResolver[breakpoint],
    lineHeight: headlineFontSizeResolver[breakpoint],
    marginBottom: 0,
    textAlign: "center"
  },
  imageContainer: {
    width: "100%"
  },
  summaryContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colours.functional.border,
    paddingHorizontal: spacing(4),
    paddingVertical: spacing(3)
  }
});

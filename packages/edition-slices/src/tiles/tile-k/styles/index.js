import {
  fonts,
  spacing,
  colours,
  editionBreakpoints
} from "@times-components/styleguide";

const headlineSizeResolver = {
  [editionBreakpoints.huge]: 25,
  [editionBreakpoints.wide]: 22,
  [editionBreakpoints.small]: 18,
  [editionBreakpoints.medium]: 22
};

export default breakpoint => ({
  container: {
    flexDirection: "row",
    padding: spacing(2)
  },
  headline: {
    color: colours.functional.primary,
    fontFamily: fonts.headline,
    fontSize: headlineSizeResolver[breakpoint],
    lineHeight: headlineSizeResolver[breakpoint],
    marginBottom: spacing(2)
  },
  imageContainer: {
    paddingRight: spacing(2),
    width: "50%"
  },
  summaryContainer: {
    width: "50%"
  }
});

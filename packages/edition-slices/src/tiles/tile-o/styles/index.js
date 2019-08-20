import {
  fonts,
  spacing,
  colours,
  editionBreakpoints
} from "@times-components/styleguide";

const fontSizeResolver = {
  [editionBreakpoints.small]: 18,
  [editionBreakpoints.medium]: 18,
  [editionBreakpoints.wide]: 20,
  [editionBreakpoints.huge]: 20
};

export default breakpoint => ({
  container: {
    flex: 1,
    backgroundColor: colours.functional.darkSupplement,
    paddingHorizontal: 12,
    paddingVertical: spacing(2),
    marginRight: spacing(1)
  },
  flagColour: {
    color: colours.functional.greyLabel
  },
  headlineStyle: {
    color: colours.functional.white,
    fontFamily: fonts.headline,
    fontSize: fontSizeResolver[breakpoint],
    lineHeight: fontSizeResolver[breakpoint],
    marginBottom: 11
  },
  summaryContainer: {
    flex: 1
  }
});

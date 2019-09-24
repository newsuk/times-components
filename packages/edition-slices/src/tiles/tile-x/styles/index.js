import {
  colours,
  fonts,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const fontSizeResolver = {
  [editionBreakpoints.medium]: 40,
  [editionBreakpoints.wide]: 40,
  [editionBreakpoints.huge]: 45
};

export default breakpoint => ({
  container: {
    flex: 1,
    padding: spacing(2),
    paddingTop: spacing(3)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: fontSizeResolver[breakpoint],
    lineHeight: fontSizeResolver[breakpoint],
    marginBottom: spacing(2)
  },
  strapline: {
    fontFamily: fonts.headlineRegular,
    color: colours.functional.primary,
    fontSize: 24,
    lineHeight: 26
  }
});

import {
  colours,
  fonts,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const mediumBreakpointStyles = {
  container: {
    flex: 1,
    padding: spacing(2),
    paddingTop: spacing(3)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 40,
    lineHeight: 40,
    marginBottom: spacing(2)
  },
  strapline: {
    fontFamily: fonts.headlineRegular,
    color: colours.functional.primary,
    fontSize: 24,
    lineHeight: 26
  }
};

const wideBreakpointStyles = {
  ...mediumBreakpointStyles
};

export default breakpoint =>
  breakpoint === editionBreakpoints.medium
    ? mediumBreakpointStyles
    : wideBreakpointStyles;

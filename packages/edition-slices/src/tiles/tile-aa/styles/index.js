import {
  fonts,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const mediumBreakpointStyles = {
  container: {
    flex: 1,
    paddingVertical: spacing(3),
    paddingHorizontal: spacing(2)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 20,
    lineHeight: 20
  }
};
const wideBreakpointStyles = {
  ...mediumBreakpointStyles,
  headline: {
    fontFamily: fonts.headline,
    fontSize: 28,
    lineHeight: 28,
    marginBottom: spacing(2)
  }
};
export default breakpoint =>
  breakpoint === editionBreakpoints.medium
    ? mediumBreakpointStyles
    : wideBreakpointStyles;

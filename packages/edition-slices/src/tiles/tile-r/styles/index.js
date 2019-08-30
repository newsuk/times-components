import {
  fonts,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const mediumBreakpointStyles = {
  container: {
    flex: 1,
    paddingVertical: spacing(3),
    paddingHorizontal: spacing(6)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 40,
    lineHeight: 40,
    marginBottom: 0
  },
  imageContainer: {
    width: "100%",
    marginBottom: spacing(2)
  },
  summaryContainer: {
    flex: 1,
    paddingBottom: spacing(2)
  }
};

const wideBreakpointStyles = {
  ...mediumBreakpointStyles,
  container: {
    flex: 1,
    paddingVertical: spacing(3),
    paddingHorizontal: spacing(4)
  }
};

export default breakpoint =>
  breakpoint === editionBreakpoints.medium
    ? mediumBreakpointStyles
    : wideBreakpointStyles;

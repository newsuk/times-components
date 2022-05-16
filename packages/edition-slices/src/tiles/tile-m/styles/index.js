import {
  colours,
  fonts,
  spacing,
  editionBreakpoints
} from "@times-components/ts-styleguide";

const smallBreakpointStyles = {
  container: {
    flex: 1,
    paddingBottom: spacing(2)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 20,
    lineHeight: 20,
    marginBottom: spacing(1),
    marginTop: spacing(4),
    textAlign: "center"
  },
  summaryContainer: {
    flex: 1
  },
  strapline: {
    color: colours.functional.secondary,
    fontFamily: fonts.bodyRegular,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    paddingHorizontal: spacing(8)
  }
};

const mediumBreakpointStyles = {
  container: {
    paddingBottom: spacing(6)
  },
  headline: {
    color: colours.functional.brandColour,
    fontFamily: fonts.headline,
    fontSize: 20,
    lineHeight: 20,
    marginTop: spacing(6),
    textAlign: "center"
  },
  strapline: {
    color: colours.functional.primary,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    paddingBottom: spacing(1)
  }
};

const wideBreakpointStyles = {
  ...mediumBreakpointStyles,
  container: {
    paddingBottom: spacing(12)
  },
  headline: {
    ...mediumBreakpointStyles.headline,
    fontSize: 24,
    lineHeight: 24
  }
};

const hugeBreakpointStyle = {
  ...wideBreakpointStyles,
  headline: {
    ...wideBreakpointStyles.headline,
    marginBottom: spacing(2)
  }
};

const breakPointsStyles = {
  [editionBreakpoints.small]: smallBreakpointStyles,
  [editionBreakpoints.medium]: mediumBreakpointStyles,
  [editionBreakpoints.wide]: wideBreakpointStyles,
  [editionBreakpoints.huge]: hugeBreakpointStyle
};

export default breakpoint => breakPointsStyles[breakpoint];

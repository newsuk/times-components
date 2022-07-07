import {
  spacing,
  fonts,
  globalSpacingStyles
} from "@times-components/ts-styleguide";

const mediumBreakpointStyles = {
  container: {
    flex: 1,
    flexDirection: "row",
    marginLeft: spacing(4),
    marginRight: spacing(4),
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    paddingBottom: spacing(3),
    paddingTop: spacing(3)
  },
  headline: {
    ...globalSpacingStyles.tabletHeadline,
    fontFamily: fonts.headline,
    fontSize: 30,
    lineHeight: 30
  },
  summaryContainer: {
    flex: 1,
    paddingRight: spacing(4)
  },
  imageContainer: {
    flex: 1
  },
  summary: {
    ...globalSpacingStyles.tabletTeaser
  }
};

const wideBreakpointStyles = {
  ...mediumBreakpointStyles,
  container: {
    ...mediumBreakpointStyles.container,
    marginLeft: spacing(2),
    marginRight: spacing(2)
  },
  headline: {
    ...mediumBreakpointStyles.headline,
    fontSize: 40,
    lineHeight: 40
  }
};

const hugeBreakpointStyles = {
  ...wideBreakpointStyles,
  headline: {
    ...wideBreakpointStyles.headline,
    fontSize: 45,
    lineHeight: 45
  }
};

const stylesResolver = {
  medium: mediumBreakpointStyles,
  wide: wideBreakpointStyles,
  huge: hugeBreakpointStyles
};

export default breakpoint => stylesResolver[breakpoint];

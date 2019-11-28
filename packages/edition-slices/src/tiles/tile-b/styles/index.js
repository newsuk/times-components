import {
  fonts,
  spacing,
  editionBreakpoints,
  globalSpacingStyles
} from "@times-components/styleguide";

const sharedStyles = {
  container: {
    flex: 1
  },
  headline: {
    ...globalSpacingStyles.tabletHeadline,
    fontFamily: fonts.headline
  }
};

const smallBreakpointStyles = {
  container: {
    ...sharedStyles.container,
    padding: spacing(2),
    paddingBottom: spacing(3)
  },
  headline: {
    ...sharedStyles.headline,
    fontSize: 25,
    lineHeight: 25,
    marginBottom: spacing(1)
  },
  summary: {
    marginBottom: spacing(1)
  }
};

const mediumBreakpointStyles = {
  container: {
    ...sharedStyles.container,
    padding: spacing(2)
  },
  headline: {
    ...sharedStyles.headline,
    fontSize: 20,
    lineHeight: 20
  },
  summary: {
    ...globalSpacingStyles.tabletTeaser
  }
};

const wideBreakpointStyles = {
  container: {
    ...sharedStyles.container,
    padding: spacing(2)
  },
  headline: {
    ...sharedStyles.headline,
    fontSize: 30,
    lineHeight: 30
  },
  summary: {
    ...globalSpacingStyles.tabletTeaser
  }
};

const hugeBreakpointStyles = {
  ...wideBreakpointStyles,
  headline: {
    ...wideBreakpointStyles.headline,
    fontSize: 35,
    lineHeight: 35
  }
};

const stylesResolver = {
  [editionBreakpoints.small]: smallBreakpointStyles,
  [editionBreakpoints.medium]: mediumBreakpointStyles,
  [editionBreakpoints.wide]: wideBreakpointStyles,
  [editionBreakpoints.huge]: hugeBreakpointStyles
};

export default breakpoint => stylesResolver[breakpoint];

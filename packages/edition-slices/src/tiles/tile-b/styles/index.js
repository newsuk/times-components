import {
  fonts,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const sharedStyles = {
  container: {
    flex: 1
  },
  headline: {
    fontFamily: fonts.headline
  }
};

const smallBreakpointStyles = {
  container: {
    ...sharedStyles.container,
    padding: spacing(2)
  },
  headline: {
    ...sharedStyles.headline,
    fontSize: 25,
    lineHeight: 25
  }
};

const mediumBreakpointStyles = {
  container: {
    ...sharedStyles.container,
    paddingVertical: spacing(3),
    paddingHorizontal: spacing(2)
  },
  headline: {
    ...sharedStyles.headline,
    fontSize: 20,
    lineHeight: 20
  }
};

const wideBreakpointStyles = {
  container: {
    ...sharedStyles.container,
    paddingVertical: spacing(3),
    paddingHorizontal: spacing(2)
  },
  headline: {
    ...sharedStyles.headline,
    fontSize: 25,
    lineHeight: 25
  }
};

const breakpointStyles = {
  [editionBreakpoints.small]: smallBreakpointStyles,
  [editionBreakpoints.medium]: mediumBreakpointStyles,
  [editionBreakpoints.wide]: wideBreakpointStyles,
  [editionBreakpoints.huge]: wideBreakpointStyles
};

export default breakpoint => breakpointStyles[breakpoint];

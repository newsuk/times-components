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
    padding: spacing(2)
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
    padding: spacing(2)
  },
  headline: {
    ...sharedStyles.headline,
    marginBottom: spacing(2),
    fontSize: 30,
    lineHeight: 30
  }
};

const stylesResolver = {
  [editionBreakpoints.small]: smallBreakpointStyles,
  [editionBreakpoints.medium]: mediumBreakpointStyles,
  [editionBreakpoints.wide]: wideBreakpointStyles,
  [editionBreakpoints.huge]: wideBreakpointStyles
};

export default breakpoint => stylesResolver[breakpoint];

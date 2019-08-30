import {
  fonts,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const sharedStyles = {
  container: {
    flex: 1,
    padding: spacing(2)
  },
  headlineStyle: {
    fontFamily: fonts.headline,
    fontSize: 20,
    lineHeight: 20,
    marginBottom: spacing(2)
  },
  summaryContainer: {
    flex: 1
  }
};

const smallBreakpointStyles = {
  ...sharedStyles
};

const mediumBreakpointStyles = {
  ...sharedStyles,
  headlineStyle: {
    ...sharedStyles.headlineStyle,
    fontSize: 18,
    lineHeight: 18,
    marginBottom: 0
  }
};

const wideBreakpointStyles = {
  ...sharedStyles,
  headlineStyle: {
    ...sharedStyles.headlineStyle,
    fontSize: 20,
    lineHeight: 20,
    marginBottom: 0
  }
};

const stylesResolver = {
  [editionBreakpoints.small]: smallBreakpointStyles,
  [editionBreakpoints.medium]: mediumBreakpointStyles,
  [editionBreakpoints.wide]: wideBreakpointStyles,
  [editionBreakpoints.huge]: wideBreakpointStyles
};

export default breakpoint => stylesResolver[breakpoint];

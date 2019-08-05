import {
  fonts,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const sharedStyles = {
  container: {
    flex: 1,
    paddingHorizontal: spacing(2),
    paddingTop: spacing(2)
  },
  headlineStyle: {
    fontFamily: fonts.headline,
    fontSize: 20,
    lineHeight: 20,
    marginBottom: spacing(2)
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
    lineHeight: 18
  }
};

export default breakpoint =>
  breakpoint === editionBreakpoints.medium
    ? mediumBreakpointStyles
    : smallBreakpointStyles;

import {
  fonts,
  spacing,
  colours,
  editionBreakpoints
} from "@times-components/ts-styleguide";

const fontSizeResolver = {
  [editionBreakpoints.small]: 18,
  [editionBreakpoints.medium]: 18,
  [editionBreakpoints.wide]: 20,
  [editionBreakpoints.huge]: 22
};

const sharedStyles = {
  container: {
    flex: 1,
    backgroundColor: colours.functional.darkSupplement,
    padding: spacing(2)
  },
  flagColour: {
    color: colours.functional.greyLabel
  },
  headlineStyle: {
    color: colours.functional.white,
    fontFamily: fonts.headline
  },
  summaryContainer: {
    flex: 1
  }
};

const smallBreakpointStyles = breakpoint => ({
  ...sharedStyles,
  container: {
    ...sharedStyles.container,
    paddingLeft: 12,
    paddingRight: 12,
    marginRight: spacing(1)
  },
  headlineStyle: {
    ...sharedStyles.headlineStyle,
    fontSize: fontSizeResolver[breakpoint],
    lineHeight: fontSizeResolver[breakpoint],
    marginBottom: 11
  }
});

const mediumBreakpointStyles = breakpoint => ({
  ...sharedStyles,
  headlineStyle: {
    ...sharedStyles.headlineStyle,
    fontSize: fontSizeResolver[breakpoint],
    lineHeight: fontSizeResolver[breakpoint],
    marginTop: breakpoint === editionBreakpoints.huge ? spacing(1) : 0
  }
});

export default breakpoint =>
  breakpoint === editionBreakpoints.small
    ? smallBreakpointStyles(breakpoint)
    : mediumBreakpointStyles(breakpoint);

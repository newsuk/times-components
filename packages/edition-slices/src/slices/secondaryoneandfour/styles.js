import {
  colours,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

export const darkBackgroundColour = {
  backgroundColor: colours.functional.darkSupplement
};

const smallBreakpointStyles = {
  logoContainer: {
    ...darkBackgroundColour,
    flexDirection: "row",
    margin: spacing(2)
  },
  separator: {
    borderBottomColor: colours.functional.tertiary
  },
  container: {
    ...darkBackgroundColour
  }
};

const mediumBreakpointStyles = {
  logoContainer: {
    ...darkBackgroundColour,
    flexDirection: "row",
    margin: spacing(3),
    marginBottom: spacing(2)
  },
  separator: {
    borderBottomColor: colours.functional.tertiary,
    marginHorizontal: spacing(3)
  },
  container: {
    ...darkBackgroundColour,
    marginVertical: spacing(3),
    marginHorizontal: spacing(6)
  }
};

const wideBreakpointStyles = {
  ...mediumBreakpointStyles,
  container: {
    ...darkBackgroundColour,
    marginVertical: spacing(3),
    marginHorizontal: spacing(4)
  }
};

const stylesResolver = {
  [editionBreakpoints.small]: smallBreakpointStyles,
  [editionBreakpoints.medium]: mediumBreakpointStyles,
  [editionBreakpoints.wide]: wideBreakpointStyles,
  [editionBreakpoints.huge]: wideBreakpointStyles
};

export default breakpoint =>
  Object.assign(smallBreakpointStyles, stylesResolver[breakpoint]);

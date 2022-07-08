import {
  colours,
  spacing,
  editionBreakpoints
} from "@times-components/ts-styleguide";

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
    marginLeft: spacing(3),
    marginRight: spacing(3)
  },
  container: {
    ...darkBackgroundColour,
    marginTop: spacing(3),
    marginBottom: spacing(3),
    marginLeft: spacing(6),
    marginRight: spacing(6)
  }
};

const wideBreakpointStyles = {
  ...mediumBreakpointStyles,
  container: {
    ...darkBackgroundColour,
    marginTop: spacing(3),
    marginBottom: spacing(3),
    marginLeft: spacing(4),
    marginRight: spacing(4)
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

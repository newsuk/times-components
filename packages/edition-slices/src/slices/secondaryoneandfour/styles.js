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
    margin: spacing(2),
    marginBottom: spacing(2)
  },
  separator: {
    borderBottomColor: colours.functional.tertiary
  },
  container: {
    ...darkBackgroundColour
  },
  sliceWrapper: {
    ...darkBackgroundColour
  }
};

const mediumBreakpointStyles = {
  container: {
    ...darkBackgroundColour
  },
  sliceWrapper: {
    ...darkBackgroundColour,
    marginVertical: spacing(3),
    marginHorizontal: spacing(6)
  }
};

export default breakpoint =>
  breakpoint === editionBreakpoints.small
    ? smallBreakpointStyles
    : { ...smallBreakpointStyles, ...mediumBreakpointStyles };

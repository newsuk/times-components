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
  sliceWrapper: {
    ...darkBackgroundColour
  }
};

const mediumBreakpointStyles = {
  sliceWrapper: {
    ...darkBackgroundColour,
    paddingHorizontal: spacing(2)
  }
};

export default breakpoint =>
  breakpoint === editionBreakpoints.small
    ? smallBreakpointStyles
    : { ...smallBreakpointStyles, ...mediumBreakpointStyles };

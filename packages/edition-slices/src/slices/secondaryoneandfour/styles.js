import {
  colours,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const smallBreakpointStyles = {
  logoContainer: {
    ...darkBackgroundColor,
    flexDirection: "row",
    margin: spacing(2),
    marginBottom: spacing(2)
  },
  separator: {
    borderBottomColor: colours.functional.tertiary
  },
  sliceWrapper: {
    ...darkBackgroundColor
  }
};

const mediumBreakpointStyles = {
  sliceWrapper: {
    ...darkBackgroundColor,
    paddingHorizontal: spacing(2)
  }
};

export const darkBackgroundColor = {
  backgroundColor: colours.functional.darkSupplement
};

export default breakpoint =>
  breakpoint === editionBreakpoints.small
    ? smallBreakpointStyles
    : { ...smallBreakpointStyles, ...mediumBreakpointStyles };

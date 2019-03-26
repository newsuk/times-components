import {
  colours,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const smallBreakpointStyles = {
  logoContainer: {
    backgroundColor: colours.functional.darkSupplement,
    flexDirection: "row",
    margin: spacing(2),
    marginBottom: spacing(2)
  },
  separator: {
    borderBottomColor: colours.functional.tertiary
  },
  sliceWrapper: {
    backgroundColor: colours.functional.darkSupplement
  }
};

const mediumBreakpointStyles = {
  sliceWrapper: {
    backgroundColor: colours.functional.darkSupplement,
    paddingHorizontal: spacing(2)
  }
};

export default breakpoint =>
  breakpoint === editionBreakpoints.small
    ? smallBreakpointStyles
    : { ...smallBreakpointStyles, ...mediumBreakpointStyles };

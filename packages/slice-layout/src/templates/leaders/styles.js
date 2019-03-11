import { editionBreakpoints, spacing } from "@times-components/styleguide";

const smallBreakpointStyles = {
  container: {
    paddingBottom: spacing(1)
  }
};

const mediumBreakpointStyles = {
  columnItems: {
    paddingHorizontal: spacing(2),
    width: "33%"
  },
  container: {
    flex: 1,
    flexDirection: "row",
    paddingBottom: spacing(1)
  }
};

export default breakpoint =>
  breakpoint === editionBreakpoints.small
    ? smallBreakpointStyles
    : mediumBreakpointStyles;

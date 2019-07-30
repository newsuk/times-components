import { editionBreakpoints, spacing } from "@times-components/styleguide";

const smallBreakpointStyles = {
  container: {
    flex: 1,
    paddingHorizontal: spacing(2)
  },
  tileContainer: {
    flex: 1
  }
};

const mediumBreakpointStyles = {
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: spacing(4),
    paddingTop: spacing(3)
  },
  tileContainer: {
    width: "33.3%"
  }
};

export default breakpoint =>
  breakpoint === editionBreakpoints.small
    ? smallBreakpointStyles
    : mediumBreakpointStyles;

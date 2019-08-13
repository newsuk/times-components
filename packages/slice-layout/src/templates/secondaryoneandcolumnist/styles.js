import { editionBreakpoints, spacing } from "@times-components/styleguide";

const smallBreakpointStyles = {};

const mediumBreakpointStyles = {
  columnistContainer: {
    width: "73%"
  },
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: spacing(4)
  },
  secondaryContainer: {
    width: "27%"
  },
  separator: {
    marginBottom: 0
  }
};

export default breakpoint =>
  breakpoint === editionBreakpoints.small
    ? smallBreakpointStyles
    : mediumBreakpointStyles;

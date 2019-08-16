import { editionBreakpoints, spacing } from "@times-components/styleguide";

const smallBreakpointStyles = {};

const mediumBreakpointStyles = {
  container: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: spacing(4)
  },
  columnistContainer: {
    width: "73%"
  },
  secondaryContainer: {
    width: "27%"
  },
  colSeparator: {
    marginVertical: spacing(3)
  }
};

export default breakpoint =>
  breakpoint === editionBreakpoints.small
    ? smallBreakpointStyles
    : mediumBreakpointStyles;

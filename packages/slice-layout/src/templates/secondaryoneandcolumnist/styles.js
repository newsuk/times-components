import { editionBreakpoints, spacing } from "@times-components/styleguide";

const smallBreakpointStyles = {};

const mediumBreakpointStyles = {
  container: {
    flex: 1,
    flexDirection: "row"
  },
  secondaryContainer: {
    width: "33%"
  },
  columnistContainer: {
    width: "67%"
  }
};

export default breakpoint =>
  breakpoint === editionBreakpoints.small
    ? smallBreakpointStyles
    : mediumBreakpointStyles;

import { editionBreakpoints, spacing } from "@times-components/styleguide";

const smallBreakpointStyles = {};

const mediumBreakpointStyles = {
  columnistContainer: {
    paddingRight: spacing(4),
    width: "67%"
  },
  container: {
    flex: 1,
    flexDirection: "row"
  },
  secondaryContainer: {
    paddingTop: spacing(2),
    width: "33%"
  }
};

export default breakpoint =>
  breakpoint === editionBreakpoints.small
    ? smallBreakpointStyles
    : mediumBreakpointStyles;

import { editionBreakpoints } from "@times-components/styleguide";

const smallBreakpointStyles = {};

const mediumBreakpointStyles = {
  cartoon: {
    width: "67%"
  },
  container: {
    flex: 1,
    flexDirection: "row",
    paddingRight: 20
  },
  lead: {
    width: "33%"
  }
};

export default breakpoint =>
  breakpoint === editionBreakpoints.small
    ? smallBreakpointStyles
    : mediumBreakpointStyles;

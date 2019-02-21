import { editionBreakpoints, spacing } from "@times-components/styleguide";

const smallBreakpointStyles = {
  item: {
    width: "50%"
  },
  itemContainer: {
    flexDirection: "row",
    flex: 1
  }
};

const mediumBreakpointStyles = {
  container: { flexDirection: "row", marginHorizontal: spacing(2) },
  item: {
    width: "25%"
  }
};

export default breakpoint =>
  breakpoint === editionBreakpoints.small
    ? smallBreakpointStyles
    : mediumBreakpointStyles;

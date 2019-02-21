import { editionBreakpoints, spacing } from "@times-components/styleguide";

const smallBreakpointStyles = {
  item: {
    width: "50%"
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row"
  }
};

const mediumBreakpointStyles = {
  container: { flexDirection: "row", marginHorizontal: spacing(2) },
  item: {
    width: "25%",
    flex: 1
  }
};

export default breakpoint =>
  breakpoint === editionBreakpoints.small
    ? smallBreakpointStyles
    : mediumBreakpointStyles;

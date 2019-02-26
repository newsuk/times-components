import { editionBreakpoints, spacing } from "@times-components/styleguide";

const smallBreakpointStyles = {
  itemContainer: {
    flex: 1,
    flexDirection: "row"
  },
  itemHalfWidth: {
    width: "50%"
  }
};

const mediumBreakpointStyles = {
  container: {
    flex: 1,
    marginHorizontal: spacing(2)
  },
  item: {
    width: "50%"
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    paddingBottom: spacing(1)
  }
};

export default breakpoint =>
  breakpoint === editionBreakpoints.small
    ? smallBreakpointStyles
    : mediumBreakpointStyles;

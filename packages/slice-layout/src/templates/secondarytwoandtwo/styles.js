import { editionBreakpoints, spacing } from "@times-components/styleguide";

const smallBreakpointStyles = {
  container: {
    flex: 1
  },
  itemContainer: {
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
    flexDirection: "row"
  }
};

export default breakpoint =>
  breakpoint === editionBreakpoints.small
    ? smallBreakpointStyles
    : mediumBreakpointStyles;

import { spacing } from "@times-components/styleguide";

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

const wideBreakpointStyles = {
  container: {
    flex: 1,
    flexDirection: "row"
  },
  secondaryItemContainer: {
    width: "33.4%"
  },
  supportItemContainer: {
    width: "16.6%"
  }
};

const hugeBreakpointStyles = {
  container: {
    alignSelf: "center",
    flexDirection: "row",
    width: "86%"
  },
  secondaryItemContainer: {
    width: "33.4%"
  },
  supportItemContainer: {
    paddingHorizontal: spacing(2),
    width: "16.6%"
  }
};

const stylesToReturn = {
  huge: hugeBreakpointStyles,
  medium: mediumBreakpointStyles,
  small: smallBreakpointStyles,
  wide: wideBreakpointStyles
};

export default breakpoint =>
  stylesToReturn[breakpoint] || smallBreakpointStyles;

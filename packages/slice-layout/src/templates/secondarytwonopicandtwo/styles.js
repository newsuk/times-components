import { spacing } from "@times-components/styleguide";

const mediumBreakpointStyles = {
  item: {
    width: "50%"
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: spacing(2)
  }
};

const wideBreakpointStyles = {
  container: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: spacing(2)
  },
  secondaryItemContainer: {
    width: "33.4%"
  },
  supportItemContainer: {
    paddingHorizontal: spacing(1),
    width: "16.6%"
  }
};

const stylesToreturn = {
  huge: wideBreakpointStyles,
  medium: mediumBreakpointStyles,
  wide: wideBreakpointStyles
};

export default breakpoint =>
  stylesToreturn[breakpoint] || mediumBreakpointStyles;

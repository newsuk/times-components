import { editionBreakpoints, spacing } from "@times-components/styleguide";

const smallBreakpointStyles = {
  leadContainer: {
    flex: 1,
    flexDirection: "row"
  },
  leadItem: {
    paddingBottom: spacing(1),
    width: "50%"
  }
};

const mediumBreakpointStyles = {
  container: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: spacing(2)
  },
  rowItemContainer: {
    flex: 1
  }
};

export default breakpoint =>
  breakpoint === editionBreakpoints.small
    ? smallBreakpointStyles
    : mediumBreakpointStyles;

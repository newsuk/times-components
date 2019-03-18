import { colours, editionBreakpoints } from "@times-components/styleguide";

const smallBreakpointStyles = {
  container: {
    backgroundColor: colours.functional.darkSupplement,
    flex: 1
  },
  itemContainer: {
    flexDirection: "row"
  },
  separator: {
    borderColor: colours.functional.tertiary
  }
};

const mediumBreakpointStyles = {
  container: {
    flexDirection: "row"
  },
  itemContainer: {
    width: "25%"
  },
  secondaryItemContainer: {
    width: "50%"
  },
  separator: {
    borderColor: colours.functional.tertiary
  }
};

export default breakpoint =>
  breakpoint === editionBreakpoints.small
    ? smallBreakpointStyles
    : mediumBreakpointStyles;

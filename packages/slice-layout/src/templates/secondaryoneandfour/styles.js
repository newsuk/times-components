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
  secondaryItemContainer: {
    width: "50%"
  },
  separator: {
    borderColor: colours.functional.tertiary
  },

  supportsWrapper: {
    width: "50%"
  },

  supportContainer: {
    flex: 1,
    flexDirection: "row"
  },

  supportItem: {
    width: "50%"
  }
};

export default breakpoint =>
  breakpoint === editionBreakpoints.small
    ? smallBreakpointStyles
    : mediumBreakpointStyles;

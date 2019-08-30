import { spacing, editionBreakpoints } from "@times-components/styleguide";

const mediumBreakpointStyles = {
  container: {
    flex: 1,
    marginHorizontal: spacing(4)
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row"
  },
  item: {
    flex: 1
  },
  secondaryColSeparator: {
    marginTop: spacing(3)
  },
  supportColSeparator: {
    marginBottom: spacing(3)
  }
};

const wideBreakpointStyles = {
  container: {
    flex: 1,
    marginHorizontal: spacing(2)
  }
};

const stylesResolver = {
  [editionBreakpoints.medium]: mediumBreakpointStyles,
  [editionBreakpoints.wide]: wideBreakpointStyles,
  [editionBreakpoints.huge]: wideBreakpointStyles
};

export default breakpoint =>
  Object.assign(mediumBreakpointStyles, stylesResolver[breakpoint] || {});

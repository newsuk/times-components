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
    marginVertical: spacing(3)
  },
  supportColSeparator: {
    marginBottom: spacing(3)
  }
};

const wideBreakpointStyles = {
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: spacing(2)
  },
  secondaryContainer: {
    width: "66.6%",
    flexDirection: "row"
  },
  supportContainer: {
    flex: 1,
    marginVertical: spacing(1)
  },
  item: {
    width: "50%"
  }
};

const stylesResolver = {
  [editionBreakpoints.medium]: mediumBreakpointStyles,
  [editionBreakpoints.wide]: wideBreakpointStyles,
  [editionBreakpoints.huge]: wideBreakpointStyles
};

export default breakpoint =>
  Object.assign(mediumBreakpointStyles, stylesResolver[breakpoint] || {});

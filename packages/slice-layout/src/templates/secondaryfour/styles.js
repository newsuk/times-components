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
  container: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: spacing(4)
  },
  columnsContainer: {
    flex: 2,
    flexDirection: "row"
  },
  columnItem: {
    flex: 1
  },
  rowsContainer: {
    flex: 1
  },
  colSeparatorStyle: {
    marginVertical: spacing(3)
  }
};

const wideBreakpointStyles = {
  container: {
    flexDirection: "row",
    marginHorizontal: spacing(2)
  },
  item: {
    flex: 1,
    width: "25%"
  }
};

const stylesResolver = {
  [editionBreakpoints.small]: smallBreakpointStyles,
  [editionBreakpoints.medium]: mediumBreakpointStyles,
  [editionBreakpoints.wide]: wideBreakpointStyles,
  [editionBreakpoints.huge]: wideBreakpointStyles
};

export default breakpoint => stylesResolver[breakpoint];

import {
  colours,
  editionBreakpoints,
  spacing
} from "@times-components/styleguide";

const smallBreakpointStyles = {
  container: {
    paddingBottom: spacing(1)
  }
};

const mediumBreakpointStyles = {
  columnItems: {
    paddingHorizontal: spacing(3),
    width: "33%"
  },
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: spacing(1)
  },
  itemColSeparator: {
    borderColor: colours.functional.keyline,
    borderRightWidth: 1,
    borderStyle: "solid",
    marginVertical: spacing(6)
  }
};

const wideBreakpointStyles = {
  columnItems: {
    paddingHorizontal: spacing(2),
    width: "33%"
  },
  container: {
    flex: 1,
    flexDirection: "row",
    paddingBottom: spacing(1)
  }
};

const stylesResolver = {
  [editionBreakpoints.small]: smallBreakpointStyles,
  [editionBreakpoints.medium]: mediumBreakpointStyles,
  [editionBreakpoints.wide]: wideBreakpointStyles,
  [editionBreakpoints.huge]: wideBreakpointStyles
};

export default breakpoint => stylesResolver[breakpoint];

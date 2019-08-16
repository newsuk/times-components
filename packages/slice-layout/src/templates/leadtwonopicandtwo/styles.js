import { spacing } from "@times-components/styleguide";

const sharedStyles = {
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: spacing(2)
  },
  column: {
    width: "50%"
  }
};

const mediumBreakpointStyles = {
  container: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: spacing(4)
  },
  column: {
    ...sharedStyles.column
  },
  colSeparatorStyle: {
    marginVertical: spacing(3)
  }
};

const wideBreakpointStyles = {
  ...sharedStyles,
  column: {
    width: "42%"
  },
  middleTile: {
    width: "16%"
  }
};

const stylesResolver = {
  medium: mediumBreakpointStyles,
  wide: wideBreakpointStyles,
  huge: wideBreakpointStyles
};

export default breakpoint => stylesResolver[breakpoint] || {};

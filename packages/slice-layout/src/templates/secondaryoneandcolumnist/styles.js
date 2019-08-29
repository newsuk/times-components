import { editionBreakpoints, spacing } from "@times-components/styleguide";

const mediumBreakpointStyles = {
  container: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: spacing(4)
  },
  columnistContainer: {
    width: "73%"
  },
  secondaryContainer: {
    width: "27%",
    paddingVertical: spacing(1)
  },
  colSeparator: {
    marginVertical: spacing(3)
  }
};

const wideBreakpointStyles = {
  container: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: spacing(2)
  },
  columnistContainer: {
    width: "67%"
  },
  secondaryContainer: {
    width: "33%",
    paddingVertical: spacing(1)
  },
  colSeparator: {
    marginVertical: spacing(3)
  }
};

const stylesResolver = {
  [editionBreakpoints.medium]: mediumBreakpointStyles,
  [editionBreakpoints.wide]: wideBreakpointStyles,
  [editionBreakpoints.huge]: wideBreakpointStyles
};

export default breakpoint => stylesResolver[breakpoint] || {};

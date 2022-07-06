import { editionBreakpoints, spacing } from "@times-components/ts-styleguide";

const smallBreakpointStyles = {
  container: {
    flex: 1,
    paddingLeft: spacing(2),
    paddingRight: spacing(2)
  },
  tileContainer: {
    flex: 1
  }
};

const mediumBreakpointStyles = {
  container: {
    flex: 1,
    flexDirection: "row",
    paddingTop: spacing(3),
    paddingLeft: spacing(4),
    paddingRight: spacing(4)
  },
  tileContainer: {
    width: "33.3%"
  }
};

const wideBreakpointStyles = {
  ...mediumBreakpointStyles,
  container: {
    ...mediumBreakpointStyles.container,
    paddingLeft: spacing(2),
    paddingRight: spacing(2)
  }
};

const breakPointsStyles = {
  [editionBreakpoints.small]: smallBreakpointStyles,
  [editionBreakpoints.medium]: mediumBreakpointStyles,
  [editionBreakpoints.wide]: wideBreakpointStyles,
  [editionBreakpoints.huge]: wideBreakpointStyles
};

export default breakpoint => breakPointsStyles[breakpoint];

import { editionBreakpoints, spacing } from "@times-components/styleguide";

const smallBreakpointStyles = {
  container: {
    flex: 1,
    paddingHorizontal: spacing(2)
  },
  tileContainer: {
    flex: 1
  }
};

const defaultBreakpointStyles = {
  container: {
    flex: 1,
    flexDirection: "row",
    paddingTop: spacing(3),
    paddingHorizontal: spacing(4)
  },
  tileContainer: {
    width: "33.3%"
  }
};

const wideBreakpointStyles = {
  container: {
    ...defaultBreakpointStyles.container,
    paddingHorizontal: spacing(2)
  },
  tileContainer: {
    ...defaultBreakpointStyles.tileContainer
  }
};

const breakPointsStyles = {
  [editionBreakpoints.small]: smallBreakpointStyles,
  [editionBreakpoints.medium]: defaultBreakpointStyles,
  [editionBreakpoints.wide]: wideBreakpointStyles,
  [editionBreakpoints.huge]: defaultBreakpointStyles
};

export default breakpoint => breakPointsStyles[breakpoint];

import { editionBreakpoints, spacing } from "@times-components/styleguide";

const sharedStyles = {
  container: {
    flex: 1,
    flexDirection: "row"
  },
  colSeparator: {
    marginVertical: spacing(3)
  },
  secondaryContainer: {
    paddingVertical: spacing(1)
  }
};

const mediumBreakpointStyles = {
  ...sharedStyles,
  container: {
    ...sharedStyles.container,
    marginHorizontal: spacing(4)
  },
  columnistContainer: {
    width: "75%"
  },
  secondaryContainer: {
    ...sharedStyles.secondaryContainer,
    width: "25%"
  }
};

const wideBreakpointStyles = {
  ...sharedStyles,
  container: {
    ...sharedStyles.container,
    marginHorizontal: spacing(2)
  },
  columnistContainer: {
    width: "66.7%"
  },
  secondaryContainer: {
    ...sharedStyles.secondaryContainer,
    width: "33.3%"
  }
};

const hugeBreakpointStyles = {
  ...sharedStyles,
  container: {
    ...sharedStyles.container,
    marginHorizontal: spacing(2)
  },
  columnistContainer: {
    width: "58%"
  },
  secondaryContainer: {
    ...sharedStyles.secondaryContainer,
    width: "42%"
  }
};

const stylesResolver = {
  [editionBreakpoints.medium]: mediumBreakpointStyles,
  [editionBreakpoints.wide]: wideBreakpointStyles,
  [editionBreakpoints.huge]: hugeBreakpointStyles
};

export default breakpoint => stylesResolver[breakpoint] || {};

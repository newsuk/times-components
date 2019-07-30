import {
  fontFactory,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const sharedStyles = {
  container: {
    flex: 1,
    flexDirection: "row"
  },
  headline: {
    ...fontFactory({
      font: "headline",
      fontSize: "tileLeadHeadline"
    })
  },
  imageContainer: {
    width: "60%"
  },
  summaryContainer: {
    width: "40%"
  }
};

const mediumBreakpointStyles = {
  ...sharedStyles,
  container: {
    ...sharedStyles.container,
    paddingVertical: spacing(3),
    paddingHorizontal: spacing(2)
  },
  headline: {
    ...sharedStyles.headline,
    fontSize: 30,
    lineHeight: 30,
    marginBottom: spacing(2)
  },
  summaryContainer: {
    ...sharedStyles.summaryContainer,
    paddingRight: spacing(4)
  },
  star: {
    starButton: {
      position: "absolute",
      right: spacing(3),
      bottom: -spacing(1)
    }
  }
};

const wideBreakpointStyles = {
  ...sharedStyles,
  container: {
    ...sharedStyles.container,
    padding: spacing(2)
  },
  headline: {
    ...sharedStyles.headline,
    paddingVertical: spacing(1)
  },
  summaryContainer: {
    ...sharedStyles.summaryContainer,
    paddingBottom: spacing(1),
    paddingRight: spacing(4)
  }
};

const hugeBreakpointStyles = {
  ...wideBreakpointStyles,
  headline: {
    ...wideBreakpointStyles.headline,
    ...fontFactory({
      font: "headline",
      fontSize: "articleHeadline"
    })
  }
};

const stylesResolver = {
  [editionBreakpoints.medium]: mediumBreakpointStyles,
  [editionBreakpoints.wide]: wideBreakpointStyles,
  [editionBreakpoints.huge]: hugeBreakpointStyles
};

export default breakpoint => stylesResolver[breakpoint];

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
    flex: 1,
    paddingVertical: spacing(3),
    paddingHorizontal: spacing(2)
  },
  imageContainer: {
    width: "100%"
  },
  summaryContainer: {
    width: "100%",
    paddingBottom: spacing(2)
  },
  headline: {
    ...sharedStyles.headline,
    fontSize: 40,
    lineHeight: 40,
    marginBottom: spacing(2)
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

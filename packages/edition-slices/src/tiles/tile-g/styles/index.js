import {
  fonts,
  fontFactory,
  spacing,
  editionBreakpoints,
  globalSpacingStyles
} from "@times-components/ts-styleguide";

const defaultStyles = {
  container: {
    flex: 1,
    flexDirection: "row",
    padding: spacing(2)
  },
  headline: {
    ...fontFactory({
      font: "headline",
      fontSize: "infoTitle"
    }),
    marginBottom: spacing(1)
  },
  imageContainer: {
    overflow: "hidden",
    width: "30%"
  },
  summaryContainer: {
    flex: 1,
    paddingLeft: spacing(2),
    width: "70%",
    justifyContent: "center"
  },
  outerContainer: {
    flexDirection: "column",
    flex: 1
  },
  innerContainer: {
    flexDirection: "row",
    flex: 1
  },
  customStarPosition: {
    position: "relative",
    bottom: spacing(2),
    marginBottom: spacing(-3)
  }
};

const mediumBreakpointStyles = {
  container: {
    ...defaultStyles.container,
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    paddingBottom: spacing(3),
    paddingTop: spacing(3)
  },
  headline: {
    ...globalSpacingStyles.tabletHeadline,
    fontFamily: fonts.headline,
    fontSize: 20,
    lineHeight: 20
  },
  imageContainer: {
    overflow: "hidden",
    width: 97
  }
};

const wideBreakpointStyles = {
  ...mediumBreakpointStyles,
  container: {
    ...defaultStyles.container,
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    paddingBottom: spacing(2),
    paddingTop: spacing(2)
  }
};

const hugeBreakpointStyles = {
  ...wideBreakpointStyles,
  headline: {
    fontFamily: fonts.headline,
    fontSize: 20,
    lineHeight: 20,
    marginBottom: 0
  }
};

const stylesResolver = {
  [editionBreakpoints.medium]: mediumBreakpointStyles,
  [editionBreakpoints.wide]: wideBreakpointStyles,
  [editionBreakpoints.huge]: hugeBreakpointStyles
};

export default breakpoint =>
  Object.assign(defaultStyles, stylesResolver[breakpoint] || {});

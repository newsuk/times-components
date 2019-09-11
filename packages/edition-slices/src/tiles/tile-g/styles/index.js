import {
  fonts,
  fontFactory,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

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
    })
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
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(3)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 20,
    lineHeight: 20,
    marginBottom: 0
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
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(2)
  }
};

const stylesResolver = {
  [editionBreakpoints.medium]: mediumBreakpointStyles,
  [editionBreakpoints.wide]: wideBreakpointStyles,
  [editionBreakpoints.huge]: mediumBreakpointStyles
};

export default breakpoint =>
  Object.assign(defaultStyles, stylesResolver[breakpoint] || {});

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
    width: "70%"
  },
  summaryContent: {
    justifyContent: "center",
    flex: 1
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
    lineHeight: 20
  },
  imageContainer: {
    overflow: "hidden",
    width: 97
  }
};

const stylesResolver = {
  [editionBreakpoints.medium]: mediumBreakpointStyles,
  [editionBreakpoints.wide]: mediumBreakpointStyles,
  [editionBreakpoints.huge]: mediumBreakpointStyles
};

export default breakpoint =>
  Object.assign(defaultStyles, stylesResolver[breakpoint] || {});

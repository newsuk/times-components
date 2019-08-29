import {
  fonts,
  fontFactory,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const defaultStyles = {
  container: {
    flex: 1,
    padding: spacing(2)
  },
  outerWrapper: {
    flex: 1
  },
  innerWrapper: {
    flexDirection: "row"
  },
  imageContainer: {
    overflow: "hidden",
    width: "30%"
  },
  summaryContainer: {
    width: "70%",
    justifyContent: "center"
  },
  summaryContent: {
    paddingLeft: spacing(2)
  },
  nopadding: {
    paddingTop: 0
  },
  customPosition: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    right: 0
  },
  customStar: {
    height: 25,
    width: 25
  },
  headline: {
    ...fontFactory({
      font: "headline",
      fontSize: "infoTitle"
    }),
    marginBottom: 0
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
  }
};

const stylesResolver = {
  [editionBreakpoints.medium]: mediumBreakpointStyles,
  [editionBreakpoints.wide]: mediumBreakpointStyles,
  [editionBreakpoints.huge]: mediumBreakpointStyles
};

export default breakpoint =>
  Object.assign(defaultStyles, stylesResolver[breakpoint] || {});

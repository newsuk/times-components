import {
  fonts,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const mediumBreakpointStyles = {
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(3)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 30,
    lineHeight: 30,
    marginBottom: spacing(2)
  },
  imageContainer: {
    flex: 0.44
  },
  summaryContainer: {
    flex: 0.56,
    paddingRight: spacing(4)
  }
};

const wideBreakpointStyles = {
  ...mediumBreakpointStyles,
  imageContainer: {
    flex: 1
  },
  summaryContainer: {
    flex: 1,
    paddingRight: spacing(4)
  },
  headline: {
    ...mediumBreakpointStyles.headline,
    fontSize: 40,
    lineHeight: 40
  }
};

const hugeBreakpointStyles = {
  ...mediumBreakpointStyles,
  imageContainer: {
    flex: 0.26
  },
  summaryContainer: {
    flex: 0.74,
    paddingRight: spacing(4)
  },
  headline: {
    ...mediumBreakpointStyles.headline,
    fontSize: 45,
    lineHeight: 45
  }
};

const stylesResolver = {
  [editionBreakpoints.medium]: mediumBreakpointStyles,
  [editionBreakpoints.wide]: wideBreakpointStyles,
  [editionBreakpoints.huge]: hugeBreakpointStyles
};

export default breakpoint => stylesResolver[breakpoint];

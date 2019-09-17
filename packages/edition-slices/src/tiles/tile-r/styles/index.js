import {
  fonts,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const mediumBreakpointStyles = {
  container: {
    flex: 1,
    paddingVertical: spacing(3),
    paddingHorizontal: spacing(6)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 40,
    lineHeight: 40,
    marginBottom: 0
  },
  imageContainer: {
    width: "100%",
    marginBottom: spacing(2)
  },
  summaryContainer: {
    flex: 1,
    paddingBottom: spacing(2)
  }
};

const wideBreakpointStyles = {
  ...mediumBreakpointStyles,
  container: {
    flex: 1,
    paddingVertical: spacing(3),
    paddingHorizontal: spacing(4)
  }
};

const hugeBreakpointStyles = {
  ...wideBreakpointStyles,
  headline: {
    fontFamily: fonts.headline,
    fontSize: 45,
    lineHeight: 45,
    marginBottom: 0
  }
};

const stylesResolver = {
  [editionBreakpoints.medium]: mediumBreakpointStyles,
  [editionBreakpoints.wide]: wideBreakpointStyles,
  [editionBreakpoints.huge]: hugeBreakpointStyles
};

export default breakpoint => stylesResolver[breakpoint];

import {
  fonts,
  spacing,
  editionBreakpoints
} from "@times-components/ts-styleguide";

const mediumBreakpointStyles = {
  container: {
    flex: 1,
    paddingLeft: spacing(6),
    paddingRight: spacing(6),
    paddingBottom: spacing(3),
    paddingTop: spacing(3)
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
  }
};

const wideBreakpointStyles = {
  ...mediumBreakpointStyles,
  container: {
    flex: 1,
    paddingLeft: spacing(4),
    paddingRight: spacing(4),
    paddingBottom: spacing(3),
    paddingTop: spacing(3)
  },
  imageContainer: {
    width: "100%",
    marginBottom: spacing(3)
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

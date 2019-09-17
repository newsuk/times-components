import { spacing, fonts } from "@times-components/styleguide";

const mediumBreakpointStyles = {
  container: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: spacing(4),
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(3)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 30,
    lineHeight: 30,
    marginBottom: spacing(2)
  },
  summaryContainer: {
    flex: 1,
    width: "51.5%",
    paddingRight: spacing(4)
  },
  imageContainer: {
    width: "48.5%"
  }
};

const wideBreakpointStyles = {
  ...mediumBreakpointStyles,
  container: {
    ...mediumBreakpointStyles.container,
    marginHorizontal: spacing(2)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 40,
    lineHeight: 40,
    marginBottom: spacing(2)
  }
};

const stylesResolver = {
  medium: mediumBreakpointStyles,
  wide: wideBreakpointStyles,
  huge: wideBreakpointStyles
};

export default breakpoint => stylesResolver[breakpoint];

import {
  fonts,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const headlineFontSizeResolver = {
  [editionBreakpoints.huge]: 22,
  [editionBreakpoints.wide]: 22,
  [editionBreakpoints.small]: 20,
  [editionBreakpoints.medium]: 20
};

const styles = breakpoint => ({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: spacing(2)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: headlineFontSizeResolver[breakpoint],
    lineHeight: headlineFontSizeResolver[breakpoint],
    marginBottom: 0
  },
  imageContainer: {
    width: "30%"
  },
  summaryContainer: {
    paddingHorizontal: spacing(2),
    width: "70%"
  }
});

const mediumBreakpointStyles = {
  summaryContainer: {
    width: "100%"
  }
};

export default breakpoint =>
  breakpoint === editionBreakpoints.medium
    ? { ...styles(breakpoint), ...mediumBreakpointStyles }
    : styles(breakpoint);

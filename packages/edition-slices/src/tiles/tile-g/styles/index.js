import {
  fonts,
  fontFactory,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const styles = {
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
  ...styles,
  container: {
    ...styles.container,
    padding: spacing(2),
    paddingBottom: spacing(3)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 20,
    lineHeight: 20
  }
};

export default breakpoint =>
  breakpoint === editionBreakpoints.medium ? mediumBreakpointStyles : styles;

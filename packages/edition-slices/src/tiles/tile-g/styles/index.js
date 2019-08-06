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
    }),
    paddingBottom: spacing(1)
  },
  imageContainer: {
    overflow: "hidden",
    width: "30%"
  },
  summaryContainer: {
    justifyContent: "center",
    paddingLeft: spacing(2),
    paddingTop: spacing(1),
    width: "70%",
    paddingBottom: 0
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
    ...styles.headline,
    fontFamily: fonts.headline,
    fontSize: 20,
    lineHeight: 20
  }
};

export default breakpoint =>
  breakpoint === editionBreakpoints.medium ? mediumBreakpointStyles : styles;

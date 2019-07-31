import {
  fonts,
  fontFactory,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";

const styles = {
  container: {
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
    width: "50%",
    paddingRight: spacing(2)
  },
  summaryContainer: {
    paddingBottom: spacing(1),
    paddingTop: spacing(2),
    paddingRight: spacing(2),
    width: "50%"
  }
};

const mediumBreakpointStyles = {
  container: {
    padding: spacing(2),
    paddingTop: spacing(3)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 20,
    lineHeight: 20
  },
  imageContainer: {
    width: "100%"
  },
  summaryContainer: {
    paddingTop: spacing(2)
  }
};

export default breakpoint =>
  breakpoint === editionBreakpoints.medium ? mediumBreakpointStyles : styles;

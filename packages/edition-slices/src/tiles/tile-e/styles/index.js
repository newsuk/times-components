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
    width: "50%"
  },
  summaryContainer: {
    width: "50%",
    paddingLeft: spacing(2),
    paddingBottom: spacing(1)
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
    width: "100%",
    marginBottom: spacing(2)
  }
};

export default breakpoint =>
  breakpoint === editionBreakpoints.medium ? mediumBreakpointStyles : styles;

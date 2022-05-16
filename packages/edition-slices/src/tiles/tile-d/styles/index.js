import {
  fonts,
  fontFactory,
  spacing,
  editionBreakpoints
} from "@times-components/ts-styleguide";

const styles = {
  container: {
    flexDirection: "row",
    padding: spacing(2)
  },
  headline: {
    ...fontFactory({
      font: "headline",
      fontSize: "infoTitle"
    }),
    marginBottom: spacing(2)
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
    flexDirection: "row",
    padding: spacing(2),
    paddingBottom: spacing(3)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 20,
    lineHeight: 20,
    marginBottom: 0
  },
  imageContainer: {
    flex: 1
  },
  summaryContainer: {
    flex: 1,
    paddingLeft: spacing(2)
  }
};

export default breakpoint =>
  breakpoint === editionBreakpoints.medium ? mediumBreakpointStyles : styles;

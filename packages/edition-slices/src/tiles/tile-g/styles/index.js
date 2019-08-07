import {
  fonts,
  fontFactory,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";
import { fullHeightSummaryContainer } from "../../shared/styles";

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
    fontFamily: fonts.headline,
    fontSize: 20,
    lineHeight: 20
  },
  summaryContainer: {
    paddingLeft: spacing(2),
    width: "70%",
    ...fullHeightSummaryContainer
  },
  summaryContent: {
    justifyContent: "center",
    flex: 1
  }
};

export default breakpoint =>
  breakpoint === editionBreakpoints.medium ? mediumBreakpointStyles : styles;

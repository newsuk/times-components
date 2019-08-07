import {
  fonts,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";
import { fullHeightSummaryContainer } from "../../shared/styles";

const mediumBreakpointStyles = {
  container: {
    paddingHorizontal: spacing(2),
    paddingTop: spacing(2),
    paddingBottom: spacing(3)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 30,
    lineHeight: 30,
    marginBottom: spacing(2)
  },
  summaryContainer: {
    ...fullHeightSummaryContainer
  }
};

const wideBreakpointStyles = {
  container: {
    padding: spacing(2)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 30,
    lineHeight: 30
  },
  summaryContainer: {
    marginHorizontal: spacing(2),
    ...fullHeightSummaryContainer
  }
};

export default breakpoint =>
  breakpoint === editionBreakpoints.medium
    ? mediumBreakpointStyles
    : wideBreakpointStyles;

import {
  fonts,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";
import { fullHeightSummaryContainer } from "../../shared/styles";

const sharedStyles = {
  container: {
    flex: 1
  },
  headline: {
    fontFamily: fonts.headline
  }
};

const smallBreakpointStyles = {
  container: {
    ...sharedStyles.container,
    padding: spacing(2)
  },
  headline: {
    ...sharedStyles.headline,
    fontSize: 25,
    lineHeight: 25
  }
};

const mediumBreakpointStyles = {
  container: {
    ...sharedStyles.container,
    paddingVertical: spacing(3),
    paddingHorizontal: spacing(2)
  },
  headline: {
    ...sharedStyles.headline,
    fontSize: 20,
    lineHeight: 20
  },
  summaryContainer: {
    ...fullHeightSummaryContainer
  }
};

export default breakpoint =>
  breakpoint === editionBreakpoints.medium
    ? mediumBreakpointStyles
    : smallBreakpointStyles;

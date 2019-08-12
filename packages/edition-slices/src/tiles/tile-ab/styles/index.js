import {
  fonts,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";
import { fullHeightSummaryContainer } from "../../shared/styles";

const headlineFontSizeResolver = {
  [editionBreakpoints.huge]: 45,
  [editionBreakpoints.wide]: 45,
  [editionBreakpoints.small]: 30,
  [editionBreakpoints.medium]: 30
};

export default breakpoint => ({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: spacing(2),
    paddingVertical:
      breakpoint === editionBreakpoints.medium ? spacing(3) : spacing(2)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: headlineFontSizeResolver[breakpoint],
    lineHeight: headlineFontSizeResolver[breakpoint],
    marginBottom: spacing(1)
  },
  image: {
    alignSelf: "flex-end"
  },
  imageContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
    width: "50%"
  },
  summaryContainer: {
    paddingLeft: spacing(4),
    width: "50%"
  }
});

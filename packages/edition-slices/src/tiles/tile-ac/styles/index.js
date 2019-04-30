import {
  colours,
  fonts,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";
import { verticalStyles } from "../../shared/styles";

const headlineFontSizeResolver = {
  [editionBreakpoints.huge]: 35,
  [editionBreakpoints.wide]: 35,
  [editionBreakpoints.small]: 30,
  [editionBreakpoints.medium]: 30
};

export default breakpoint => ({
  container: {
    flex: 1
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: headlineFontSizeResolver[breakpoint],
    lineHeight: headlineFontSizeResolver[breakpoint],
    marginBottom: spacing(2),
    textAlign: "center"
  },
  imageContainer: {
    width: "100%"
  },
  star: verticalStyles,
  summaryContainer: {
    alignItems: "center",
    backgroundColor: colours.functional.border,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: spacing(8),
    paddingVertical: spacing(4)
  }
});

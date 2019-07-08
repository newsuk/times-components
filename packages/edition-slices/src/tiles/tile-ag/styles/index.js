import {
  fonts,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";
import { verticalStyles } from "../../shared/styles";

const headlineFontSizeResolver = {
  [editionBreakpoints.huge]: 35,
  [editionBreakpoints.wide]: 30
};

export default breakpoint => ({
  container: {
    paddingBottom: spacing(2),
    paddingHorizontal: spacing(4)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: headlineFontSizeResolver[breakpoint],
    lineHeight: headlineFontSizeResolver[breakpoint],
    marginBottom: spacing(1),
    marginTop: spacing(4),
    textAlign: "center"
  },
  star: verticalStyles,
  strapline: {
    fontFamily: fonts.bodyRegular,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center"
  }
});

import {
  colours,
  fonts,
  fontSizes,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";
import { verticalStyles } from "../../shared/styles";

const headlineFontSizeResolver = {
  [editionBreakpoints.medium]: 30,
  [editionBreakpoints.wide]: 35,
  [editionBreakpoints.huge]: 45
};

const styles = (breakpoint = editionBreakpoints.medium) => ({
  container: {
    flex: 1,
    alignItems: "center",
    marginRight: spacing(2),
    paddingVertical: spacing(2)
  },
  headline: {
    color: colours.functional.brandColour,
    fontFamily: fonts.headline,
    fontSize: headlineFontSizeResolver[breakpoint],
    lineHeight: headlineFontSizeResolver[breakpoint],
    paddingVertical: spacing(2),
    textAlign: "center",
    marginBottom: 0
  },
  imageContainer: {
    overflow: "hidden",
    width: "40%",
    marginBottom: spacing(1)
  },
  star: {
    ...verticalStyles.starButton,
    position: "relative",
    right: "auto"
  },
  strapline: {
    color: colours.functional.secondary,
    fontFamily: fonts.bodyRegular,
    fontSize: fontSizes.meta,
    lineHeight: 20,
    textAlign: "center",
    paddingBottom: spacing(1)
  },
  summaryContainer: {
    alignItems: "center",
    paddingTop: spacing(1)
  }
});

export default styles;

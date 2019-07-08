import {
  colours,
  fonts,
  fontSizes,
  spacing,
  editionBreakpoints
} from "@times-components/styleguide";
import { verticalStyles } from "../../shared/styles";

const headlineFontSizeResolver = {
  [editionBreakpoints.medium]: 25,
  [editionBreakpoints.wide]: 35,
  [editionBreakpoints.huge]: 45
};

const styles = (breakpoint = editionBreakpoints.medium) => ({
  bylineOpinion: {
    color: colours.section.comment,
    fontFamily: fonts.supporting,
    fontSize: fontSizes.cardMetaMobile,
    letterSpacing: 0.6,
    lineHeight: 12
  },
  container: {
    alignItems: "center",
    paddingBottom: spacing(3),
    paddingHorizontal: spacing(4),
    paddingTop: spacing(2)
  },
  headline: {
    color: colours.functional.brandColour,
    fontFamily: fonts.headline,
    fontSize: headlineFontSizeResolver[breakpoint],
    lineHeight: headlineFontSizeResolver[breakpoint],
    paddingTop: spacing(3),
    textAlign: "center"
  },
  imageContainer: {
    overflow: "hidden",
    width: "40%"
  },
  star: {
    ...verticalStyles.starButton,
    position: "relative",
    right: "auto"
  },
  strapline: {
    color: colours.functional.secondary,
    fontSize: fontSizes.meta,
    lineHeight: 20,
    textAlign: "center"
  },
  summaryContainer: {
    alignItems: "center",
    paddingTop: spacing(1)
  }
});

export default styles;

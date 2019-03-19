import {
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";

const styles = {
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
    fontSize: 25,
    lineHeight: 25,
    paddingTop: spacing(3),
    textAlign: "center"
  },
  imageContainer: {
    borderColor: colours.functional.contrast,
    borderWidth: 1,
    overflow: "hidden",
    width: "30%"
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
};

export default styles;

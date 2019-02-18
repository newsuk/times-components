import { colours, fonts, fontSizes } from "@times-components/styleguide";

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
    paddingVertical: 20
  },
  headline: {
    color: "#1d1d1b",
    fontFamily: "TimesModern-Bold",
    fontSize: 35,
    lineHeight: 35,
    paddingHorizontal: 10,
    paddingTop: 10,
    textAlign: "center"
  },
  imageContainer: {
    borderColor: colours.functional.contrast,
    borderWidth: 1,
    overflow: "hidden",
    width: "30%"
  },
  strapline: {
    color: "#696969",
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 40
  },
  summaryContainer: {
    alignItems: "center",
    paddingTop: 10
  }
};

export default styles;

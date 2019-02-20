import {
  fonts,
  spacing,
  fontSizes,
  colours
} from "@times-components/styleguide";

const styles = {
  bold: {
    color: colours.functional.brandColour,
    fontWeight: "bold"
  },
  byline: {
    color: colours.functional.secondary,
    fontFamily: fonts.supporting,
    fontSize: 12,
    marginTop: spacing(2)
  },
  container: {
    paddingBottom: spacing(2)
  },
  paragraph: {
    color: colours.functional.secondary,
    fontFamily: fonts.headline,
    fontSize: 14,
    lineHeight: 20
  },
  title: {
    color: colours.functional.brandColour,
    fontFamily: fonts.headline,
    fontSize: fontSizes.smallHeadline,
    marginBottom: spacing(3)
  },
  titleWrapper: {
    alignItems: "center"
  }
};

export default styles;
